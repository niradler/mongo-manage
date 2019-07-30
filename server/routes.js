const router = require("express").Router();
const db = require('./controllers/db');
const collection = require('./controllers/collection');

router.use(db);
router.use(collection);

module.exports = router;
