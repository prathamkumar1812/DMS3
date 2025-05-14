import { createStore } from 'vuex';
import { CreateAccount, deleteFile, getFiles, getMe, Login, logout, UploadFile } from '../lib/service';

const store= createStore({
   state:{
     User:{},
     isLogin:false,
     DocFiles:{},
     pageno:1,
     search:""
     
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
      },
      setSearch(state,data){
        state.search=data;
      },
      setPageNo(state,data){
        state.pageno=data;
      },
      setData(state,data){
        state.DocFiles.totalItems-=1;
        state.DocFiles.items=data;
      }
     
   },
   getters: {
  totalFiles(state) {
    return state.DocFiles?.totalItems || 0;
  },
   getFileNameById: (state) => (id) => {
      const file = state.DocFiles?.items?.find(f => f.fileId === id);
      return file ? file.fileName : 'Unknown';
    }
},
   actions:{
    async createUser({commit},data){
       try {
        console.log(data);
         await CreateAccount({name:data.fullName,password:data.password,email:data.username});
         await Login({email:data.username,password:data.password});
        
       } catch (error) {

           console.log(error);
           throw new Error(error)
           
       }
    },
    async loginUser({commit},data){
    try {
       const tokens=await Login({email:data.username,password:data.password});
       console.log(tokens);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
         
    }
    },
    async getCurrentUser({commit,state}){
     try {
       const data= await getMe();
       
      //  const filedata= await getFiles({search:state.search,pageno:state.pageno});
      //  console.log(filedata)
       commit('setUser', data);
      //  commit('setFiles',filedata);
     } catch (error) {
        console.log(error)
     }

    },
    async Upload({commit,state},{formData,onUploadProgress}){
       formData.append('UserId',state.User.userId);
       try {
         const data= await UploadFile({formData,onUploadProgress});
         console.log("error")
         const filedata= await getFiles({search:"",pageno:1});
         console.log(filedata)
         commit('setFiles',filedata);
         state.User.files++;
         return data;
       } catch (error) {
         console.log(error)
       }
    },
    async getFilesFromTags({commit,state}){
     
       try {
        const filedata= await getFiles({search:state.search,pageno:state.pageno});
        commit('setFiles',filedata);
       } catch (error) {
          commit('setFiles',[]);
          console.log(error)
       }
    },
    async deleteFileById({commit,state},data){
       try {
         await deleteFile(data);
         const filedata= await getFiles({search:"",pageno:1});
         console.log(filedata)
         commit('setFiles',filedata);
         state.User.files--;
         
       } catch (error) {
         console.log(error)
       }
    },
    async logoutUser({commit}){
      try {
         await logout();
        commit("removeUser");
        window.location.href = '/login';
         
      } catch (error) {
        
      }
    }
    ,
    async getFilesFromPageNo({commit,state}){
      
       try {
        const filedata= await getFiles({search:state.search,pageno:state.pageno});
        commit('setFiles',filedata);
       } catch (error) {
          commit('setFiles',[]);
          console.log(error)
       }
    },
    async getFilesData({commit},{tag,pageno}){
       try {
         const filedata= await getFiles({search:tag,pageno});
         commit('setFiles',filedata);
       } catch (error) {
          commit('setFiles',[]);
           throw new Error(error) 
       }
    },

   }

});

export default store;
