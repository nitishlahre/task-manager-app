import connectToDatabase from '../../libs/mongoDB';
import Task from '../../models/task.model';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const { title, desc } = req.body;

      const newTask = new Task({ title, desc });
      await newTask.save();
      return res.status(201).json(newTask); 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  else if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const tasks = await Task.find(); 
      return res.status(200).json(tasks); 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query; 
      await connectToDatabase();
      const deletedTask = await Task.findByIdAndDelete(id); 
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(200).json({ message: 'Task deleted successfully' }); 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  
  else if (req.method === 'PUT') {
    try {
      const { id } = req.query; 
      const { title, desc } = req.body; 
      await connectToDatabase();
      const updatedTask = await Task.findByIdAndUpdate(
        id, 
        { title, desc }, 
        { new: true } 
      );
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(200).json(updatedTask); 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
