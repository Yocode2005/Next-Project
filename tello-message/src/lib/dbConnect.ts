import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

// Note: Mongoose maintains a global connection pool, so we can use the same connection across different parts of the application. This function ensures that we only create a new connection if one doesn't already exist.
// mtlb : check kreneg ki agar connection already exist krta h ya nhi agr nhi krta to hi new connection create krenge or agr krta hai to usi connection ko use krenge


async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;