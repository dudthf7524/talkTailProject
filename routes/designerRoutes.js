const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const designerDatabase = require('../database/designerDatabase');
router.get('/designer/list/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
      const designerById = await designerDatabase.getDesignerById(id);
      console.log(designerById)
      res.json(designerById);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;