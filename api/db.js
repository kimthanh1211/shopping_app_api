const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kt121195:SG5wyMcDmEcswDXD@cluster0.gzoyajp.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    connectTimeoutMS:30000
  }
});

exports.getClient = function () {
  return client;
};

module.exports = client;