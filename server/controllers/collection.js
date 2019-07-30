const router = require("express").Router();
const mongoAdapter = require("mongo-simple-adapter");
const { ErrorHandlerHOC } = require("../utils");

router.get(
  "/db/:dbName/collection/list",
  ErrorHandlerHOC(async (req, res) => {
    mongoAdapter.setDbName(req.params.dbName);
    const collections = await mongoAdapter.getCollections();
    res.json(
      collections.filter(c => !c.name.includes("system")).map(c => c.name)
    );
  })
);

router.post(
  "/db/:dbName/collection/create",
  ErrorHandlerHOC(async (req, res) => {
    mongoAdapter.setDbName(req.params.dbName);
    const data = await mongoAdapter.createCollection(req.body.name);
    res.json(!!data);
  })
);

router.delete(
  "/db/:dbName/collection/:collectionName/delete",
  ErrorHandlerHOC(async (req, res) => {
    mongoAdapter.setDbName(req.params.dbName);
    const data = await mongoAdapter.deleteCollection(req.params.collectionName);
    res.json(!!data);
  })
);

router.post(
  "/db/:dbName/collection/:collectionName/find",
  ErrorHandlerHOC(async (req, res) => {
    mongoAdapter.setDbName(req.params.dbName);
    const options = {
      collection: req.params.collectionName,
      filter: req.body.filter,
      limit: req.body.limit,
      skip: req.body.skip,
      sort: req.body.sort
    };
    const collections = await mongoAdapter.find(options);
    res.json(collections);
  })
);

router.post(
  "/db/:dbName/collection/:collectionName/remove",
  ErrorHandlerHOC(async (req, res) => {
    mongoAdapter.setDbName(req.params.dbName);
    const options = {
      collection: req.params.collectionName,
      filter: req.body.filter
    };
    const collections = await mongoAdapter.remove(options);
    res.json(collections);
  })
);

router.put(
  "/db/:dbName/collection/:collectionName/update",
  ErrorHandlerHOC(async (req, res) => {
    mongoAdapter.setDbName(req.params.dbName);
    const options = {
      collection: req.params.collectionName,
      filter: req.body.filter
    };
    const collections = await mongoAdapter.update(options, req.body.doc);
    res.json(collections);
  })
);

router.post(
  "/db/:dbName/collection/:collectionName/insert",
  ErrorHandlerHOC(async (req, res) => {
    mongoAdapter.setDbName(req.params.dbName);
    const collections = await mongoAdapter.insert(
      req.params.collectionName,
      req.body.doc
    );
    res.json(collections);
  })
);

module.exports = router;
