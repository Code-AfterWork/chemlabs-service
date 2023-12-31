import {useEffect, useState} from "react";
import axios from "axios";

export const Logout = () => {

    useEffect(() => {
        (async () => {
          try {
            const {data} = await axios.post('http://127.0.0.1:8000/user/logout/',{
              refresh_token:localStorage.getItem('refreshToken')
            } ,{headers: {
              'Content-Type': 'application/json'
            }}, {withCredentials: true});
      
            console.log('logout', data)
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            window.location.href = '/login'
          } catch (e) {
            console.log('logout not working')
          }
        })();
      }, []);
      
      return null;

    return (
        <div></div>
    )
}
