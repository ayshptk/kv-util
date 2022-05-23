const kvutil = require(".");

async function main() {
  const accessKeys = {
    //redis: process.env.REDIS,
    mongo: process.env.MONGO,
  };
  Object.keys(accessKeys).forEach(async (service) => {
    try {
      const db = new kvutil(service, accessKeys[service]);
      await db.connect();
      await db.set("foo", "bar");
      await db.get("foo");
      if ((await db.get("foo")) !== "bar") {
        throw new Error("SET FAILED");
      } else {
        console.log(`${service} SET PASSED`);
        console.log(`${service} GET PASSED`);
      }
      await db.delete("foo");
      if ((await db.get("foo")) !== null) {
        console.log(await db.get("foo"));
        throw new Error("DELETE FAILED");
      } else {
        console.log(`${service} DELETE PASSED`);
      }
      await db.disconnect();
    } catch (e) {
      console.log("==========");
      console.log(`${service} TEST FAILED`);
      console.log(e);
      console.log("==========");
    }
  });
}

main();
