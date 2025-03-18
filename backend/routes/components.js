const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');
const auth = require('../middleware/auth');
const Component = require('../models/Component');

// @route   GET api/components
// @desc    Get all components
// @access  Private
router.get('/', auth, componentController.getComponents);

// @route   POST api/components
// @desc    Create a component
// @access  Private
router.post('/', auth, componentController.createComponent);

// @route   GET api/components/:id
// @desc    Get component by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    
    // Check if component belongs to user
    if (component.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(component);
  } catch (err) {
    // Keep error logging for server errors
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 