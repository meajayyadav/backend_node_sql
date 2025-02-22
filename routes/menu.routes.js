const express = require("express");
const { getMenus } = require("../controllers/menu.controller");

const router = express.Router();

router.get("/menus", getMenus);

module.exports = router;
