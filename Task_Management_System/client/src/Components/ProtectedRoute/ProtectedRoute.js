// import { message } from 'antd';
// import React, { useEffect } from 'react';
// import { GetCurrentUser } from '../../APICalls/user';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { SetUser } from '../../Redux/usersSlice';
// import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

// const ProtectedRoute = () => {
//     const {user} = useSelector((state)=>state.users);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     const getPresentUser= async ()=>{
//         try{
//             const response= await GetCurrentUser();
//             if(response.success){
//                 message.success(response.message);
//                 dispatch(SetUser(response?.data));
//             }else{
//                 dispatch(SetUser((null)));
//                 message.error(response.message);
//             }
//         }catch(error){
//             message.error(error);
//         }
//     } 

//     useEffect(()=>{
//         if(localStorage.getItem("TMS")){
//             getPresentUser();
//         }else{
//             navigate("/login");
//         }
//     },[]);
//   return (
//     user &&(
//     <AppBar position="static">
//       <Container>
//         <Toolbar sx={{display:'flex' , justifyContent:'space-between'}}>
//           <Box>
//             <Typography variant="h6">Task Management System</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             {user && (
//               <Typography variant="body1" sx={{ color: 'white', mr: 2 }}>
//                 {user.name}
//               </Typography>
//             )}
//             <Button onClick={
//                 ()=>{
//                     localStorage.removeItem("TMS");
//                     navigate("/login")
//                 }
//             } color="inherit">
//               Logout
//             </Button>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//     )
//   )
// }

// export default ProtectedRoute;


import { message } from 'antd';
import React, { useEffect } from 'react';
import { GetCurrentUser } from '../../APICalls/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '../../Redux/usersSlice';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const getPresentUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                message.success(response.message);
                dispatch(SetUser(response?.data));
            } else {
                dispatch(SetUser(null));
                message.error(response.message);
            }
        } catch (error) {
            message.error(error);
        }
    } 

    useEffect(() => {
        if (localStorage.getItem("TMS")) {
            getPresentUser();
        } else {
            navigate("/login");
        }
    }, [navigate, dispatch]);

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h6">Task Management System</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {user && (
                                <Typography variant="body1" sx={{ color: 'white', mr: 2 }}>
                                    {user.name}
                                </Typography>
                            )}
                            <Button onClick={() => {
                                localStorage.removeItem("TMS");
                                navigate("/login");
                            }} color="inherit">
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <main style={{marginTop:'64px'}}>
                {children}
            </main>
        </>
    );
}

export default ProtectedRoute;
