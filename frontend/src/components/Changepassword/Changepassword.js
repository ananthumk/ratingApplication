import React, { useContext, useEffect, useState } from 'react'
import './Changepassword.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Changepassword = ({setPasswordPopup}) => {
  
  const {url} = useContext(StoreContext);

  let token = ''

  useEffect(() => {
    token = localStorage.getItem('token')
    console.log('password token', token)
  }, [])

  const [data, setData] = useState({
    currentPassword: '',
    newPassword: ''
  })

  const onChangeHandler = (event) => {
      setData((data) => ({...data, [event.target.name]: event.target.value}))
  }

  const onSubmitHandlers = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.put(
            `${url}/api/users/me/password`, 
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if(response.data.success) {
            setPasswordPopup(false);
        }
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className='change-password'>
       <div className='change-password-content'>
         <div className='close-conatiner'>
            <h3>Change Password</h3>
            <img onClick={() => setPasswordPopup(false)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8l6n2yOnF4xZrH1BQYXqPe1w5yt3CqSHdq0f6Yrcle_yInqZbHGnxVqfpXsOcnHpcIWQ&usqp=CAU" alt="" />
         </div>         
         <form onSubmit={onSubmitHandlers} className='form-conatiner' >
           <input onChange={onChangeHandler} type="password" name="currentPassword" value={data.currentPassword} placeholder='old password' required />
           <input onChange={onChangeHandler} type="password" name="newPassword" value={data.newPassword} placeholder='new password' required />
           <button onClick={() => setPasswordPopup(false)} type="submit">Change Password</button>
         </form>           
       </div>
    </div>
  )
}

export default Changepassword
