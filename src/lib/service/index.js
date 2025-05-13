import axios from "axios";



export async function CreateAccount(data) {
    try {
        const response= await axios.post('/Auth/register',data);
        return response.data;
    }
    catch (error) {
        console.log(error)
        throw new Error(error)
    }   
}

export async function Login(data) {
    try {
        const response= await axios.post('/Auth/login',data)
        return response.data;
    } 
    catch ( error) {

        console.log(error)
        throw new Error(error)

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
export async function getFilesByPages(pageno=1) {
   try {
   const response=axios.get(`/File/?pageNumber=${pageno}`);
   const data=(await response).data;
    
     return data;
   } catch (error) {
    console.log(error);
    throw new Error(error);
   }
}

export async function getFiles({search="",pageno=1}) {
   try {
   const response=axios.get(`/File/?tag=${search}&&pageNumber=${pageno}`);
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

export async function UploadFile({formData,onUploadProgress}) {
    try {
        const response= await axios.post('/File/upload',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress:onUploadProgress
        });
        const data= await response.data;
        return data;
    } catch (error) {
      
        console.log(error);
        throw new Error(error)
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