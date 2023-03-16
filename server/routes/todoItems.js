const router = require('express').Router();
const todoItemsModel = require('../models/todoItems');

// create a new todo item for a user
router.post('/api/user/:userId/item', async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
      userId: req.params.userId
    });
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.json(err);
  }
});

// get all todo items for a user
router.get('/api/user/:userId/items', async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({ userId: req.params.userId });
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

// update a todo item
router.put('/api/item/:id', async (req, res) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json(updateItem);
  } catch (err) {
    res.json(err);
  }
});

// delete a todo item
router.delete('/api/item/:id', async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
