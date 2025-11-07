const taskRepository = require('../repositories/taskRepository');

const getAllTasks = async () => {
  return await taskRepository.findAll();
};

const createTask = async (title, completed = false) => {
  return await taskRepository.create(title.trim(), completed);
};

const updateTask = async (id, title, completed) => {
  return await taskRepository.update(id, title.trim(), completed);
};

const deleteTask = async (id) => {
  return await taskRepository.deleteById(id);
};

const toggleTaskCompleted = async (id) => {
  const task = await taskRepository.findById(id);
  
  if (!task) {
    return null;
  }
  
  const newCompleted = !task.completed;
  return await taskRepository.updateCompleted(id, newCompleted);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompleted
};

