import axios from "axios";
import { create } from "zustand";
import { api } from "../utils/api";



export const useData=create((set,get)=>({
    data:[],
    loading:false,
    error:null,


    get:async(search)=>{
        set({loading:true,error:null})
        try {
            let {data}=await axios.get(api,{
                params:{
                    fullname:search || undefined,
                },
            })
            set({data})
        } catch (error) {
            console.log(error);
        }
        finally {
  set({ loading: false });
}
    },
      postUser: async (newUser) => {
    try {
      await axios.post(api, newUser);
      await get().get();
      return true;
    } catch (error) {
      set({ error });
      return false;
    }
  },


  editUser: async (id, updatedUser) => {
    try {
      await axios.put(`${api}/${id}`, updatedUser);
      await get().get();
      return true;
    } catch (error) {
      set({ error });
      return false;
    }
  },

deleteUser:async(id)=>{
    try {
        await axios.delete(`${api}/${id}`)
        await get().get()
        return true
    } catch (error) {
         set({ error });
      return false;
    }
}
}))