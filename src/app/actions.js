// 'use server'

// import { MongooseClient } from "../libs/mongoose.lib"
// import Task from "../models/task.model"

// export const getTaskActions = async () => {
//     try {
//         await MongooseClient();

//         const tasks = await Task.find().sort('-created');
//         return JSON.parse(JSON.stringify(tasks))
//     } catch (err) {
//         throw err
//     }
// } 

// export const addTaskActions = async ({ title }) => {
//     try {
//         await MongooseClient();
        
//         const newTask = await Task.create({ title })
//         return {
//             newTask: JSON.parse(JSON.stringify(newTask))
//         };
//     } catch (err) {
//         throw err;
//     }
// } 
// export const  deleteTaskActions = async ({ id }) => {
//     try {
//         await MongooseClient();
//         await Task.findByIdAndDelete(id)
        
//         return { success: true }
//     } catch (err) {
//         throw err
        
//     }
// } 
// export const updateTaskStatusAction = async ({ id, newStatus }) => {
//     try {
//         await MongooseClient();
        
//         const task = await Task.findById(id)
//         if(!task)
//             throw new Error('Task not found')

//         task.completed = newStatus
//         await task.save()
//         return { success: true }
        
//     } catch (err) {
//         throw err
//     }
// } 
