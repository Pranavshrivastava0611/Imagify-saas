// app/actions/user.ts (or wherever your server logic is)
"use server";

import { connectToDatabase } from "@/lib/database/mongoose";

export async function fetchUserData() {
  await connectToDatabase();
  // Fetch user data here (e.g., from MongoDB)
}
