const Component = require('../models/Component');

// Get all UI components
exports.getComponents = async (req, res) => {
  try {
    const components = await Component.find({ user: req.user.id });
    res.json(Array.isArray(components) ? components : [components]);
  } catch (err) {
    // Keep error logging for server errors
    console.error('Error getting components:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Create a new component
exports.createComponent = async (req, res) => {
  try {
    const component = new Component({
      name: req.body.name,
      data: req.body.data,
      user: req.user.id
    });
    
    const newComponent = await component.save();
    res.status(201).json(newComponent);
  } catch (err) {
    // Keep error logging for server errors
    console.error('Error creating component:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// Delete a component
exports.deleteComponent = async (req, res) => {
  // ... function code
}; 