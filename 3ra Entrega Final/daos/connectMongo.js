const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PSW } = require("../src/config/config");
const { logger } = require("../src/utils/loggers");

const connectMongoDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PSW}@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    )
    .then(() => {
      logger.info({ message: "Connected to Mongo Atlas" });
    })
    .catch((err) => logger.error({ message: err }));
};

const disconnectMongoDB = () => {
  mongoose.connection.close();
  logger.info({ message: "Disconnected from Mongo DB" });
};

module.exports = { connectMongoDB, disconnectMongoDB };
