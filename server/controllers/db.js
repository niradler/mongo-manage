const router = require("express").Router();
const mongoAdapter = require("mongo-simple-adapter");
const { ErrorHandlerHOC } = require("../utils");

router.get(
  "/db/test",
  ErrorHandlerHOC(async (req, res) => {
    const connected = await mongoAdapter.test();
    if (!connected) throw new Error("Unable to connect!");
    res.json({ connected });
  })
);

router.get(
  "/db/list",
  ErrorHandlerHOC(async (req, res) => {
    const dbs = await mongoAdapter.getDatabases();
    res.json(dbs);
  })
);

router.post(
  "/db/create/:dbName",
  ErrorHandlerHOC(async (req, res) => {
    const data = await mongoAdapter.createDatabase(req.params.dbName);
    res.json(data);
  })
);

router.delete(
  "/db/delete/:dbName",
  ErrorHandlerHOC(async (req, res) => {
    const data = await mongoAdapter.deleteDatabase(req.params.dbName);
    res.json(data);
  })
);

module.exports = router;
