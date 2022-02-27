# kvutil

a tiny utility to quickly use any database as a key-value storage and access using the same interface. to switch your database provider, simply swap the access url. no code changes are required.

supported methods:

- [x] `get` - get value
- [x] `set` - set value
- [x] `delete` - delete key
- [x] `getOriginalClient` - returns an initiated client with official SDK of the particular service
- [ ] `find` - not implemented

supported databases

- [x] redis
- [x] mongo
- [ ] firebase

## installation

make sure you have node installed

```
node -v
```

install kvutil from npm

```
npm i kvutil
```

or

```
yarn add kvutil
```

## usage

```js
// import
const kvutil = require("kvutil");
```

### initialize

#### using redis

```js
const uri = "redis://default:********@containers-us-west-26.railway.app:6513";
const db = new kvutil("redis", url);
```

#### using mongo

```js
const uri = "mongodb+srv://<user>:<pass>@<cluster>?writeConcern=majority";
const db = new kvutil("mongo", url);
```

### operations

```js
async function main() {
  // connect to database
  await db.connect();

  // write
  await db.set("foo", "bar");

  // read
  await db.get("foo");

  // delete
  await db.delete("foo");

  // use official SDK of the service
  db.getOriginalClient();
}
```


feel free to open PRs and add more db services. 