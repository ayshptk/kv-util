const redis = require("redis");
const { MongoClient, ServerApiVersion } = require("mongodb");

const services = {
  redis: redisDB,
  mongo: mongoDB,
};
function db(service, access) {
  return new services[service](access);
}

function redisDB(access) {
  const client = redis.createClient({
    url: access,
  });
  client.on("error", (err) => {
    console.error("REDIS ERROR:", err);
  });
  this.connect = async () => {
    await client.connect();
  };
  this.disconnect = async () => {
    await client.quit();
  };
  this.set = async (key, value) => {
    await client.set(key, value);
  };
  this.get = async (key) => {
    return await client.get(key);
  };
  this.delete = async (key) => {
    await client.del(key);
  };
}

function mongoDB(access) {
  this.client = new MongoClient(access, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  this.connect = async () => {
    await this.client.connect();
  };
  this.disconnect = async () => {
    await this.client.close();
  };
  const db = this.client.db("KV");
  const collection = db.collection("default");
  this.set = async (key, value) => {
    await collection.insertOne({ key, value });
  };
  this.get = async (key) => {
    const doc = await collection.findOne({ key });
    if (doc != null) {
      return doc.value;
    }
    return null;
  };
  this.delete = async (key) => {
    await collection.deleteOne({ key });
  };
}

module.exports = db;
