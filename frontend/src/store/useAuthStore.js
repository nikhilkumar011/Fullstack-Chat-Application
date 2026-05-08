import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import {toast} from 'react-hot-toast'
import {io} from 'socket.io-client'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001';



export const useAuthStore = create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:true,
    isLoggingIn:true,
    isUpdating:false,
    socket:null,
    onlineUsers:[],


    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
       try {
         const res = await axiosInstance.post('/auth/signup',data);
         toast.success("Account Created Successfully")
         set({authUser:res.data});
         get().connectSocket();

       } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
       } finally{
        set({isSigningUp:false})
       }
    },

    logout:async()=>{
      try {
        const res = await axiosInstance.post('/auth/logout');
        toast.success("Logged Out Successfully");
        set({authUser:null});
        get().disconnectSocket();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    login:async(data)=>{
        try {
            const res = await axiosInstance.post('/auth/login',data);
            toast.success("Logged in Successfully");
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isLoggingIn:false});
        }
        
    },

    updateProfile:async(data)=>{
        set({isUpdating:true})
        try {
            const res = await axiosInstance.put('/auth/updateprofile',data);
            set({authUser:res.data})
            toast.success("Updated Profile Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isUpdating:false});
        }
    },

    connectSocket:()=>{
       const {authUser} = get();
       if(!authUser || get().socket?.connected) return; 
       const socket = io(BASE_URL,{
        query:{
            userId:authUser._id,
        }
       });
       socket.connect();
       set({socket:socket});

       socket.on("getOnlineUsers",(userIds)=>{
          set({onlineUsers:userIds})
       })
    }
    ,
    disconnectSocket:()=>{
       if(get().socket?.connected) get().socket.disconnect();
    }

    
})); 