"use server"

import mongoose, {Mongoose} from 'mongoose'

interface MongooseConnection{
    promise : Promise<Mongoose> | null,
    conn :  Mongoose | null,
}

const MongodbURL = process.env.MONGODB_URL;

// because the next js follow the stateless behaviour we have to use the caching ( we have to make the connection at each server request)
let cached : MongooseConnection = (global as any).mongoose // this returns two things a promise of the connection and the connection veriable which tells us whether the connection is being setup or not

if(!cached){
    cached = (global as any).mongoose={
        conn : null , promise : null
    }
}


//serverless  nature of the next js we are trying to reduce the connection call to the database by caching the calls
export const connectToDatabase = async ()=>{
    if(cached.conn) return cached.conn; // optimization to cached connection

    if(!MongodbURL) throw new Error("Missing mongodb url");

    cached.promise = cached.promise || mongoose.connect(MongodbURL,{dbName:'saas ai application' , bufferCommands : false})  // if no cached.promise we are creating a new promise connection here;

    cached.conn = await cached.promise;

    return cached.conn; 
}

 