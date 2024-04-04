require("dotenv").config();
const mongoose = require("mongoose");

/**
 * This function will invoke mongoose to connect to our database
 * @params void
 * @returns void
 *
 */

const connectingDb = async () => {
  try {
    // connecting to the db url

    const conn = await mongoose.connect(
      process.env.DB_URL,
      // When entering our password, we need to make sure special characters are URL encoded.
      {
        // It's recommended to set this option to true to ensure compatibility with MongoDB's latest features.
        useNewUrlParser: true,
        //It provides a more modern and efficient way of handling server connections.
        // Setting this option to true is recommended for the latest MongoDB drivers.
        useUnifiedTopology: true,

      }
    );

    console.log(`MongoDB successfully connected at ${conn.connection.host}`);

  } catch (e) {
    // catching potential errors so that our server doesn't crash
    console.error(e.message);

    // Should we retry connecting to the database if it fails to connect?
  }
};

/**
 * Function to disconnect from database
 * @params void
 * @returns void
 *
 */

const disconnectDb = async () => {
  await mongoose.disconnect();
  console.log(`Disconnecting...`);
};

module.exports = {
  connectingDb,
  disconnectDb,
};
