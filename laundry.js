const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all laundry data
router.get('/', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM laundry');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Getting status based on reg_no
router.get('/status/:reg_no', async (req, res) => {
    const regNo = req.params.reg_no;
  
    try {
      const data = await db.oneOrNone('SELECT status FROM laundry WHERE reg_no = $1', regNo);
  
      if (data) {
        res.json({ status: data.status });
      } else {
        res.json({ status: 'NOT GIVEN' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// GET laundry data by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await db.one('SELECT * FROM laundry WHERE id = $1', id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Laundry data not found' });
  }
});

// GET laundry details by registration number
router.get('/details/:reg_no', async (req, res) => {
    const regNo = req.params.reg_no;
  
    try {
      const data = await db.oneOrNone('SELECT * FROM laundry WHERE reg_no = $1', regNo);
  
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'Laundry data not found for the given registration number' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// POST a new laundry record
router.post('/', async (req, res) => {
  const { reg_no, room_no, status, clothes } = req.body;
  try {
    const data = await db.one(
      'INSERT INTO laundry (reg_no, room_no, status, clothes) VALUES ($1, $2, $3, $4) RETURNING id',
      [reg_no, room_no, status, clothes]
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT (update) laundry data by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { reg_no, room_no, status, clothes } = req.body;
  try {
    await db.none(
      'UPDATE laundry SET reg_no=$1, room_no=$2, status=$3, clothes=$4 WHERE id=$5',
      [reg_no, room_no, status, clothes, id]
    );
    res.json({ message: 'Laundry data updated successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Laundry data not found' });
  }
});

// DELETE laundry data by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.none('DELETE FROM laundry WHERE id = $1', id);
    res.json({ message: 'Laundry data deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Laundry data not found' });
  }
});

module.exports = router;
