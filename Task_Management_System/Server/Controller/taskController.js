const Task= require('../Model/task');
const User=require('../Model/User');

const createTask = async (req, res) => {
  try {
      let { title, description, status, priority, dueDate, userId } = req.body;
      const creatorUserId = req.user.userId;
      const creatorName = req.user.name;
      const isAdmin = req.user.isAdmin;

      console.log("Check assigned userId:", userId);

      // Validate input
      if (!title || !description || !status || !priority || !dueDate) {
          return res.status(400).json({ message: 'All task fields are required', success:false });
      }

      // Check if userId is present in the database
      if (userId) {
          const user = await User.findByPk(userId);
          if (!user) {
              return res.status(404).json({ message: 'User not found', success:false });
          }
      }

      // Determine the userId to be assigned to the task
      if (isAdmin) {
          // Admin logic
          userId = userId ? userId : creatorUserId;
      } else {
          // Non-admin logic
          userId = creatorUserId;
      }

      const newTask = await Task.create({
          title,
          description,
          status,
          priority,
          dueDate,
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: creatorName,
      });

      return res.status(201).json({ message: 'Task created successfully',success:true ,data: newTask });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const isAdmin = req.user.isAdmin;
    // if(isAdmin){
    //   const AllTask= await Task.findAll();
    //   return res.status(200).json({message:"Fetched all task successfully",success:true,data: AllTask});
    // }

    // return res.status(401).json({message:"Admin can only fetched", success:false});

    const AllTask= await Task.findAll();
    if(AllTask){
      return res.status(200).json({message:"Fetched all task successfully", success:true, data:AllTask});

    }
    return res.status(401).json({message:"Unable to fetch dara", success: false})
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const getTaskById= async( req, res)=>{

  const {id}= req.params;
  console.log(id);
    try{
        const task= await Task.findByPk(id);

        if(!task){
          return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task fetched successfully",success:true, data:task});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateTask = async (req, res) => {
  try {
      const taskId = req.params.id;
      const { title, description, status, priority, dueDate, userId } = req.body;

      const task = await Task.findByPk(taskId);

      if (!task) {
          return res.status(404).json({ message: 'Task not found', success:false });
      }else{
         
        await task.update({
          title,
          description,
          status,
          priority,
          dueDate,
          userId,
        });

        return res.status(200).json({message:"Task Updated Successfully", success: true,data:task});

      }

      // Ensure the user is authorized to update the task
      // if (req.user.isAdmin || task.userId === req.user.id) {
      //     // Check if userId exists if provided
      //     if (userId) {
      //         const user = await User.findByPk(userId);
      //         if (!user) {
      //             return res.status(404).json({ message: 'User not found' });
      //         }
      //     }

      //     await task.update({
      //         title,
      //         description,
      //         status,
      //         priority,
      //         dueDate,
      //         userId,
      //     });

      //     return res.status(200).json({message:"Task Updated Successfully", success: true,data:task});
      // }

      res.status(403).json({ message: 'You are not authorized to update this task' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

  
  // Delete a task
  const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found', success:false });
      }
  
      // Ensure the user is authorized to delete the task
      if (req.user.isAdmin || task.userId === req.user.id) {
        await task.destroy();
        return res.status(200).send({message:"Task Deleted Successfully", success:true});
      }
  
      res.status(403).json({ message: 'You are not authorized to delete this task' , success:false});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports={
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
  };