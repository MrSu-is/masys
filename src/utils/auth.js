import { logRout } from "../routers";

export  function getToken(){
    return localStorage.getItem('token')
}
export  function setToken(token){
    localStorage.setItem('token',token)
}
export function clearToken(){
    localStorage.removeItem("token")
}

export  function isLoged(){
    if(localStorage.getItem("token")){
        return true;
    }else{
        return false;
    }
}