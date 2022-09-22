const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// Current location `/api/tags`

// find all tags and associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll(req.body, {
      include: [{ model: Product }], // through: ?? as: ??
    });
    if (!tagData) {
      res.status(404).json({ message: "No tags found." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by `id` and include associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // through: ?? as: ??
      include: [{ model: Product, through: ProductTag, as: "tag_products" }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json[{ message: "No tag found with this id!" }];
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    if (!tagData) {
      res.json({ message: "You must enter a tag name." });
      return;
    }
    res.status(200).json(tagData);
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
