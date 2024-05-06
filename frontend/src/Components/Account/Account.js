import React, { useEffect, useState } from 'react'
import './Account.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Account = () => {

  const [account, setAccount] = useState(false);
  const [accountDetails, setAccountDetails] = useState();

  const [error, setError] = useState("");

  const postAuthor = localStorage.getItem("userLoginUsername");
  const token = localStorage.getItem("userLoginResponseToken");
  const { setIsLoggedIn } = useContext(AuthContext);


  // create and update the account here
  useEffect(() => {
    fetchAccountDeatils()
  }, [])
  const fetchAccountDeatils = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/account/update_profile/`, {
        headers: {
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
    <div className='account'>
      {
        account ? (
          <div className='account-details'>
            <img src={`http://127.0.0.1:8000${accountDetails.image}`} />
            <h6>Your Username <p>{accountDetails.username}</p></h6>
            <h6>Your E-Mail <p>{accountDetails.email}</p></h6>
            <h6>Title <p>{accountDetails.title}</p></h6>
            <h6>Bio <p>{accountDetails.description}</p></h6>
            <Link to={`/update-account`}>Update Account</Link>

          </div>
        ) : (
          <div className='create-account'>
            <Link to={`/create-account`}>Create Account</Link>
          </div>
        )
      }
    </div>
  )
}

export default Account