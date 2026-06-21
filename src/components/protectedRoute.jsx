import { useState, useEffect } from "react";
import{ Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({children}){
    
    const [isAuth,setIsAuth] = useState(null)

    useEffect(()=>{
        const checkAuth = async () =>{
            try{
                await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`,{
                    withCredentials:true
                })
                setIsAuth(true)
            }
            catch(err){
                setIsAuth(false)
                console.log(err)
            }
        }
        checkAuth()
    },[])

    if(isAuth == null) return <p>....Loding</p>

    return isAuth ? children : <Navigate to="/login"/>

}

export default ProtectedRoute
