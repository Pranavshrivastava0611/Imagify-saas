import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

// const MongodbURL = process.env.MONGODB_URL;


// ✅ Fix caching with proper global variable handling
let cached: MongooseConnection = global.mongoose ?? { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ✅ Optimized database connection with caching
export const connectToDatabase = async () => {
  if (cached.conn){
    console.log("connected to database from cache");
    return cached.conn;
  } 
   // Return cached connection if available

  if (!process.env.MONGODB_URL) throw new Error("Missing MongoDB URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "saas_ai_application",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  console.log("connected to database");
  return cached.conn;
};
