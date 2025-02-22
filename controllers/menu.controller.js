const { Menu } = require("../models/menu");

const buildMenuTree = (menus, parentId = null) => {
  return menus
    .filter(menu => menu.parent_id === parentId)
    .map(menu => ({
      id: menu.id,
      title: menu.title,
      type: menu.type,
      url: menu.url,
      icon: menu.icon,
      classes: menu.classes,
      children: buildMenuTree(menus, menu.id), // Recursive call
    }));
};

const getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    const menuTree = buildMenuTree(menus);
    res.json(menuTree);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

module.exports = { getMenus };
