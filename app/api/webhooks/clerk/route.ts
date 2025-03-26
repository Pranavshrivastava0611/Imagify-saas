/* eslint-disable camelcase */
import { clerkClient } from "@clerk/clerk-sdk-node";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is missing in environment variables.");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers in request.");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Get the body
  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error("Error parsing request body:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;
        console.log(evt.data);
      if (!email_addresses?.length) {
        console.error("User creation failed: No email address provided.");
        return NextResponse.json({ error: "User must have an email address" }, { status: 400 });
      }

      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address || "unknown@example.com",
        username: username ?? `user_${id.slice(0, 5)}`,
        firstName: first_name ?? "",
        lastName: last_name ?? "",
        photo: image_url ?? "",
      };

      const newUser = await createUser(user);
      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: { userId: newUser._id },
        });
      }
      console.log("new user created");
      return NextResponse.json({ message: "User created", user: newUser });
    }
    if (eventType === "user.updated") {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name ?? "",
        lastName: last_name ?? "",
        username: username ?? `user_${id.slice(0, 5)}`,
        photo: image_url ?? "",
      };
      const updatedUser = await updateUser(id, user);
      return NextResponse.json({ message: "User updated", user: updatedUser });
    }
    if (eventType === "user.deleted") {
      const deletedUser = await deleteUser(id!);
      return NextResponse.json({ message: "User deleted", user: deletedUser });
    }
    console.log(`Unhandled webhook event: ${eventType}`, evt.data);
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
  return NextResponse.json({ message: "Event received" });
}
