import mongoose, { Mongoose } from "mongoose";

interface MongooseConnection {
  promise: Promise<Mongoose> | null;
  conn: Mongoose | null;
}

// ✅ Disable ESLint for the global var declaration
/* eslint-disable no-var */
declare global {
  var mongoose: MongooseConnection | undefined;
}
/* eslint-enable no-var */

const MongodbURL = process.env.MONGODB_URL;

// ✅ Fix caching with proper global variable handling
let cached: MongooseConnection = global.mongoose ?? { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ✅ Optimized database connection with caching
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn; // Return cached connection if available

  if (!MongodbURL) throw new Error("Missing MongoDB URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MongodbURL, {
      dbName: "saas_ai_application",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
