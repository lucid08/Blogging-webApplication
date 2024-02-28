import axios from 'axios';

import { API_NOTIFICATION_MESSAGES } from '../constants/config.js';

//Backend URL i.e the backend server is running here
const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    //suppose there is a delay in the response of the API and API goes into pending state for that
    timeout: 10000,  //its in miliseconds
    headers:{
        "Content-Type":"application/json"
    }
})

//Interceptors
//here use() takes 2 call-back functions

axiosInstance.interceptors.request.use(
    function(config){          //if successfull
        return config;
    },   //there is comma here as it takes call-back functions as arguments
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        //stop the global loader
        return processResponse(response);
    },
    function (error){
        //stop the global loader
        return Promise.reject(processError(error));
    }
)

// If success -> return { isSucess: true,data:object}
// If fail -> return { isFail:true , status: string, msg:string, code:int}

const processResponse = (response) => {
    if(response?.status === 200){
        return { isSuccess: true,data:response.data}
    }
    else{
        return {
        isFailure: true,
        status: response?.status,
        msg: response?.msg,
        code: response?.code
    }
}
}

const processError = (error) => {
    if(error.response){
        // Request is made and the server has responded with a status that falls out of the range 2.x.x
        console.log('Error in response: ',error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }
    else if(error.request){
        //Request is made but no response was recieved
        console.log('Error in Request: ',error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""
        }
    }
    else{
        //Frontend problemo Something happend in setting up request that trigeers an error
        console.log('Error in Network: ',error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}


