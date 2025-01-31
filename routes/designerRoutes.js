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


router.post('/designer/day', async (req, res) => {
  console.log(req.body)
  const id = req.body.id;
  
  const selectedDateUTC = new Date(req.body.selectedDate);
  selectedDateUTC.setHours(selectedDateUTC.getHours() + 9); // UTC → KST 변환
  const selectedDate = selectedDateUTC.toISOString().split('T')[0];
  
  console.log("변환된 날짜 (한국 시간):", selectedDate);


  try {
      const result = await designerDatabase.DesignerDay(id, selectedDate);
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }


});

router.get('/desinger/day/list/:id', async (req, res) => {
 
  console.log(req.params)

  const id = req.params.id;
  

  console.log(id)
  try {
      const result = await designerDatabase.DesignerDayList(id);
      console.log(result)
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }

});



module.exports = router;