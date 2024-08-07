import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, 
    FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddTaskModal from '../../Modal/AddTaskModal';
import { GetCurrentUser, GetAllUser } from '../../../APICalls/user';
import { GetAllTask, DeleteTask, UpdateTask } from '../../../APICalls/task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const handleEditDialogOpen = (task) => {
        setSelectedTask(task);
        setUpdatedTask({ ...task });
        setEditDialogOpen(true);
    };
    const handleEditDialogClose = () => setEditDialogOpen(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Fetch user information to check admin status
                const userResponse = await GetCurrentUser();
                console.log('User Response:', userResponse);

                if (userResponse.success) {
                    setIsAdmin(userResponse.data.isAdmin);

                    // Fetch all tasks
                    const taskResponse = await GetAllTask();
                    console.log('Task Response:', taskResponse);

                    if (taskResponse.success) {
                        const fetchedTasks = taskResponse.data; // Extract tasks from the response

                        // Fetch all users for mapping user IDs to usernames
                        const usersResponse = await GetAllUser();
                        if (usersResponse.success) {
                            setUsers(usersResponse.data); // Set the users
                        } else {
                            console.error('Failed to fetch users:', usersResponse.message);
                        }

                        if (!userResponse.data.isAdmin) {
                            // Filter tasks if the user is not an admin
                            setTasks(fetchedTasks.filter(task => task.userId === userResponse.data.id));
                        } else {
                            // Set all tasks if the user is an admin
                            setTasks(fetchedTasks);
                        }
                    } else {
                        console.error('Failed to fetch tasks:', taskResponse.message);
                    }
                } else {
                    console.error('Failed to fetch user:', userResponse.message);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [isModalOpen]);

    const handleUpdateTask = async () => {
        try {
            const response = await UpdateTask(updatedTask.id, updatedTask);
            if (response.success) {
                setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
                handleEditDialogClose();
            } else {
                console.error('Failed to update task:', response.message);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await DeleteTask(taskId);
            if (response.success) {
                setTasks(tasks.filter(task => task.id !== taskId));
            } else {
                console.error('Failed to delete task:', response.message);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask(prev => ({ ...prev, [name]: value }));
    };

    // Inline styles for text colors based on status and priority
    const statusColors = {
        Todo: { color: 'red' },
        'In Progress': { color: 'blue' },
        Done: { color: 'green' }
    };

    const priorityColors = {
        Low: { color: 'grey' },
        Medium: { color: 'orange' },
        High: { color: 'red' }
    };

    // Map user IDs to usernames
    const userMap = users.reduce((map, user) => {
        map[user.id] = user.name;
        return map;
    }, {});

    return (
        <div>
            <Button variant='contained' color="primary" onClick={handleOpen}>
                Add Task
            </Button>
            <AddTaskModal open={isModalOpen} onClose={handleClose} />

            {/* Edit Task Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                        variant="standard"
                        value={updatedTask.title || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={updatedTask.description || ''}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={updatedTask.status || ""}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value="Todo" style={statusColors.Todo}>Todo</MenuItem>
                            <MenuItem value="In Progress" style={statusColors['In Progress']}>In Progress</MenuItem>
                            <MenuItem value="Done" style={statusColors.Done}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            name="priority"
                            value={updatedTask.priority || ""}
                            onChange={handleChange}
                            label="Priority"
                        >
                            <MenuItem value="Low" style={priorityColors.Low}>Low</MenuItem>
                            <MenuItem value="Medium" style={priorityColors.Medium}>Medium</MenuItem>
                            <MenuItem value="High" style={priorityColors.High}>High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                          margin="dense"
                          name="dueDate"
                          label="Due Date"
                          fullWidth
                          variant="standard"
                          type="date"
                          value={updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString().split('T')[0] : ''}
                          onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleUpdateTask}>Update</Button>
                </DialogActions>
            </Dialog>

            {/* Display tasks in a table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Title</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Description</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Priority</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Due Date</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Assigned User</TableCell>
                            {isAdmin && <TableCell sx={{fontWeight: 'bold'}}>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell style={statusColors[task.status] || {}}>{task.status}</TableCell>
                                    <TableCell style={priorityColors[task.priority] || {}}>{task.priority}</TableCell>
                                    <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : ''}</TableCell>
                                    <TableCell>{userMap[task.userId] || 'Unknown User'}</TableCell>
                                    {isAdmin || task.userId === GetCurrentUser().data.id ? (
                                        <TableCell>
                                            <IconButton onClick={() => handleEditDialogOpen(task)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteTask(task.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No tasks available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Home;

