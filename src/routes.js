const express = require("express");
const { Home, GenerateUrl, VistLink } = require("./controllers");
const apicache = require("apicache");

const router = express.Router();
let cache = apicache.middleware;

router.get("/", Home);
router.post("/", GenerateUrl);
router.get("/:code", cache("1 day"), VistLink);

module.exports = { router };
