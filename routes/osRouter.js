var express = require('express');
var router = express.Router();

const osController = require("../Controllers/osController");

router.get("/getInformation",osController.getOsInformation);
router.get("/cpus",osController.osCpusById);

module.exports = router;