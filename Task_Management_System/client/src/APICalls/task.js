import { axiosInstance } from ".";

export const CreateTask=async(payload)=>{
    try{
        const response=await axiosInstance.post(
            "/app/v1/tasks/createTask",
            payload
        );
        return response?.data;
    }catch(error){
        return error?.response?.data || error;
    }
}

export const GetAllTask=async(payload)=>{
    try{
        const response= await axiosInstance.get(
            "/app/v1/tasks/getTask",
            payload
        );
        return response?.data;
    }catch(error){
        return error?.response?.data || error;
    }
}

export const GetTaskById= async(payload)=>{
    try{
        const response= await axiosInstance.get(
            `/app/v1/tasks/getTaskById/${id}`,
            payload
        )
        return response?.data;
    }catch(error){
        return error?.response?.data || error;
    }
}

export const UpdateTask= async(payload)=>{
    try{
        const response=await axiosInstance.patch(
            `/app/v1/tasks/updateTask/${id}`,
            payload
        )
        response?.data;
    }catch(error){
        return error?.response?.data || error;
    }
}

export const DeleteTask= async(payload)=>{
    try{
        const response= await axiosInstance.delete(
            `/app/v1/tasks/deleteTask/${id}`,
            payload
        )
        return response?.data;
    }catch(error){
        return error?.response?.data || error;
    }
}