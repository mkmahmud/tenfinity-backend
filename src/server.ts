// server.ts
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";

let server: Server;

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception detected:", err);
  process.exit(1);
});




// Global cached Mongoose connection for serverless
type MongooseCached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
let cached = (globalThis as any).mongoose as MongooseCached;

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null } as MongooseCached;
}

async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(process.env.SERVER_URL as string, {
        // optional options
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

async function main() {
  try {
    await connectDB();
    console.log("Database connected successfully");

    server = app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection detected:", err);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

// Handle SIGTERM for graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing server");
  if (server) {
    server.close(() => {
      console.log("Server closed");
    });
  }
});

main();
