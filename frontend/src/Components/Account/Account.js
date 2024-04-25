import React, { useEffect, useState } from 'react'
import './Account.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Account = () => {

  const [account,setAccount] = useState(false);
  const [accountDetails,setAccountDetails] = useState();

  const [error, setError] = useState("");

  const postAuthor = localStorage.getItem("userLoginUsername");
  const token = localStorage.getItem("userLoginResponseToken");
  const {setIsLoggedIn} = useContext(AuthContext);


  // create and update the account here
  useEffect(()=>{
    fetchAccountDeatils()
  },[])
  const fetchAccountDeatils = async () =>{
    try {
      const response = await axios.get(`http://127.0.0.1:8000/account/update_profile/`,{
        headers:{
          Authorization: `Token ${token}`
        }
      });
      setAccount(true);
      setAccountDetails(response.data);
      setIsLoggedIn(true);

    } catch (error) {
      setError(error.response.data.error);
    }
  }
  return (
    <div>
      {
        account ? (
          <div>
              <p>{accountDetails.username}</p>
              <p>{accountDetails.email}</p>
              <p>{accountDetails.title}</p>
              <p>{accountDetails.description}</p>
              <img src={`http://127.0.0.1:8000${accountDetails.image}`}/>
          </div>
        ):(
          <div>
            You Have no Account details
            Create One
          </div>
        )
      }
    </div>
  )
}

export default Account