const express = require('express');
const router = express.Router();
const EmployeeType  = require('../model/EmployeeTypeModel'); // Assuming your model file is in the same directory
const jwt = require('jsonwebtoken'); // Import the jwt library

const authToken = (req, res, next) =>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
// GET all EmployeeTypes
router.get('/get', authToken, async (req, res) => {
  try {
    const employeeTypes = await EmployeeType.findAll();
    res.json(employeeTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve EmployeeTypes' });
  }
});

// POST a new EmployeeType
router.post('/add', authToken, async (req, res) => {
  try {
    const newEmployeeType = await EmployeeType.create(req.body);
    res.status(201).json(newEmployeeType);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create EmployeeType' });
  }
});

// GET EmployeeType by ID
router.get('/get/:id', authToken, async (req, res) => {
  try {
    const employeeType = await EmployeeType.findByPk(req.params.id);
    if (!employeeType) {
      res.status(404).json({ error: 'EmployeeType not found' });
    } else {
      res.json(employeeType);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve EmployeeType' });
  }
});

// PATCH EmployeeType by ID
router.patch('/update/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedEmployeeTypes] = await EmployeeType.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'EmployeeType not found' });
    } else {
      res.json(updatedEmployeeTypes[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update EmployeeType' });
  }
});

// DELETE EmployeeType by ID
router.delete('/delte/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await EmployeeType.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'EmployeeType not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete EmployeeType' });
  }
});

module.exports = router;
