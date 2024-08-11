import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetAllUser } from '../../APICalls/user';
import { CreateTask } from '../../APICalls/task';
import { message } from 'antd';

const AddTaskModal = ({open, onClose}) => {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [status,setStatus]=useState('Todo');
  const [priority,setPriority]=useState("Medium");
  const [dueDate, setDueDate]=useState('');
  const [userList, setUserList]=useState([]);
  const [assignedUser, setAssignedUser]=useState(null);

  useEffect(()=>{
    const fetchUsers= async()=>{
      const response= await GetAllUser();
      if(response.success){
        setUserList(response.data);
      }
    }
    fetchUsers();
  },[]);

  const handleSubmit= async()=>{
    const taskData={
      title,
      description,
      status,
      priority,
      dueDate,
      userId: assignedUser
    };

    const response= await CreateTask(taskData);
    if(response.success){
      message.success(response.message);
      onClose();
    }else{
      console.error(response.message);
    }
  }
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
           <TextField
           margin='normal'
           label="Title"
           fullWidth
           variant='outlined'
           value={title}
           onChange={(e)=>{setTitle(e.target.value)}}
           />
           <TextField
           margin='normal'
           label="Description"
           multiline
           fullWidth
           variant='outlined'
           value={description}
           onChange={(e)=>{setDescription(e.target.value)}}
           />
           <FormControl  fullWidth margin='normal'>
              <InputLabel>Status</InputLabel>
              <Select
                 value={status}
                 onChange={(e)=>{setStatus(e.target.value)}}
                 label="Status"
              >
                 <MenuItem value="Todo">Todo</MenuItem>
                 <MenuItem value="In Progress">In Progress</MenuItem>
                 <MenuItem value="Done">Done</MenuItem>
              </Select>
           </FormControl>
           <FormControl fullWidth margin='normal'>
            <InputLabel>Priority</InputLabel>
               <Select
                 value={priority}
                 onChange={(e)=>{setPriority(e.target.value)}}
                 label="Priority"
               >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
               </Select>
           </FormControl>
           <TextField
             margin='normal'
             type='date'
             label="Due Date"
             fullWidth
             variant='outlined'
             InputLabelProps={{shrink: true}}
             value={dueDate}
             onChange={(e)=>setDueDate(e.target.value)}
           />
           {/* Conditionally render user selection fornon-admin users */}
           <FormControl fullWidth margin="normal">
            <InputLabel>Assign To</InputLabel>
            <Select
            value={assignedUser || ''}
            onChange={(e)=>setAssignedUser(e.target.value)}
            label="Assign To"
            >
              {userList.map((user)=>(
                <MenuItem key={user.id} value={user.id}>
                    {user.name}
                </MenuItem>
              ))}
            </Select>
           </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
             Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
             Add Task
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddTaskModal


