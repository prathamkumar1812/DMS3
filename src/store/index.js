import { createStore } from 'vuex';
import { CreateAccount, deleteFile, getFiles, getMe, Login, logout, UploadFile } from '../lib/service';

const store= createStore({
   state:{
     User:{},
     isLogin:false,
     DocFiles:[],
     
   },
   mutations:{
      setUser(state,user){
        state.User=user;
        state.isLogin=true;
      },
      setFiles(state,files){  
        state.DocFiles=files
      },
      removeUser(state){
        state.User=[];
        state.isLogin=false;
      }
     
   },
   getters:{

   },
   actions:{
    async createUser({commit},data){
       try {
        console.log(data);
         await CreateAccount({name:data.fullName,password:data.password,email:data.username});
        
       } catch (error) {
           console.log(error);
           return false;
       }
    },
    async loginUser({commit},data){
    try {
       const tokens=await Login({email:data.username,password:data.password});
       console.log(tokens);
        return data;
    } catch (error) {
        console.log(error);
    }
    },
    async getCurrentUser({commit,state}){
     try {
       const data= await getMe();
       const filedata= await getFiles();
       console.log(filedata)
       commit('setUser', data);
       commit('setFiles',filedata.items);
     } catch (error) {
        console.log(error)
     }

    },
    async Upload({commit,state},formData){
       formData.append('UserId',state.User.userId);
       try {
         const data= await UploadFile(formData);
         const filedata= await getFiles();
         commit('setFiles',filedata.items);
           return data;
       } catch (error) {
         console.log(error)
       }
    },
    async getFilesFromTags({commit},data){
      console.log(data);
       try {
        const filedata= await getFiles(data);
        commit('setFiles',filedata.items);
       } catch (error) {
          commit('setFiles',[]);
          console.log(error)
       }
    },
    async deleteFileById({commit,state},data){
       try {
         await deleteFile(data);
         commit("setFiles",state.DocFiles.filter((file)=>{
            return file.fileId!=data
         }));
       } catch (error) {
         console.log(error)
       }
    },
    async logoutUser({commit}){
      try {
         await logout();
         commit("removeUser");
         window.location.href = '/';
         
      } catch (error) {
        
      }
    }
   }

});

export default store;
