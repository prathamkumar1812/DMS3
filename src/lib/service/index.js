import axios from "axios";



export async function CreateAccount(data) {
    try {
        const response= await axios.post('/Auth/register',data);
        return response.data;
    }
    catch (error) {
        console.log(error)
    }   
}

export async function Login(data) {
    try {
        const response= await axios.post('/Auth/login',data)
        return response.data;
    } 
    catch ( error) {
        console.log(error)

    }
}

export async function getMe() {
   try {
     const response= await axios.get('/Auth/me');
     return response.data;
   } catch (error) {
      console.log(error);
      throw new Error(error)
   }
}

export async function logout() {
 try {
   await axios.post('/Auth/logout');
   
 } catch (error) {
    console.log(error)
    throw new Error(error)
 }
  
}

/// File Related API Calls

// getAll File related to the Current User

export async function getFiles(search) {
  console.log(search)
   let response;
   try {
    if(search){
       response=axios.get(`/File/?tag=${search}`);
    }
    else{
       response=axios.get("/File");
    }
     
     const data=(await response).data;
    
     return data;
   } catch (error) {
    
     console.log(error);
     throw new Error(error);
   }

}

// preview Endpoint

export async function preview(id) {
    try {
      const response = await axios.get(`/File/preview/${id}`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error('Preview error:', error);
      throw error;
    }
  }

//Upload File Endpoint

export async function UploadFile(formData) {
    try {
        const response= await axios.post('/File/upload',formData);
        const data= await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }

    
}
//Delete File Endpoint

export async function deleteFile(id) {
    try {
      await axios.delete(`/File/${id}`)
    } catch (error) {
      throw new Error(error)
    }
}