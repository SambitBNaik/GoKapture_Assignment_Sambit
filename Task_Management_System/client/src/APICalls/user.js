import { axiosInstance } from ".";

export const RegisterUser= async(payload)=>{
    try{
        const response= await axiosInstance.post(
            "/app/v1/users/register",
            payload
        );
        return response?.data;
    }catch(error){
        return error?.response?.data || error;
    }
}

export const LoginUser=async (payload)=>{
    try{
        console.log(payload);
        const response= await axiosInstance.post(
            "/app/v1/users/login",
            payload
        );
        return response?.data;
    }catch(error){
        return error?.response?.data || error;
    }
}

export const GetCurrentUser= async(payload)=>{
    try{
        const response= await axiosInstance.get(
            "/app/v1/users/getuser",
            payload
        );
        return response?.data;
    }catch(error){
        return error?.response.data || error;
    }
}

export const GetAllUser= async(payload)=>{
    try{
        const response= await axiosInstance.get(
            "/app/v1/users/getAllUser",
            payload
        );
        return response?.data;
    }catch(error){
        return error?.response.data || error;
    }
}
