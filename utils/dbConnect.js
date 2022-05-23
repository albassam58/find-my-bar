import mongoose from 'mongoose'

const connection = {}
const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const db = await mongoose.connect(MONGODB_URI, opts)

  connection.isConnected = db.connections[0].readyState
  console.log(connection.isConnected)
}

export default dbConnect