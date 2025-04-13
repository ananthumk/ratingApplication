
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setLoginPopUp }) => {
    const [currentState, setCurrentState] = useState('Sign up');
    const { setToken, url } = useContext(StoreContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'normal_user'
    });
    const [error, setError] = useState('');

    const onChangeHandler = (event) => {
        setData((data) => ({...data, [event.target.name]: event.target.value}));
    };

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        setError('');
        
        try {
            const endpoint = currentState === 'Sign up' ? '/api/auth/register' : '/api/auth/login';
            const response = await axios.post(url + endpoint, data);
            
            if(response.data.success){
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                setLoginPopUp(false);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            console.log(error);
        }
    };
    
    return (
        <div className='login-popup'>
            <div className="login-popup-content">
                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img 
                        onClick={() => setLoginPopUp(false)} 
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSziw5kJhf5wlWfH8CjQR8SbG8brfz_osSFo5pYaGlZ9vGBhoWN2VVCwrKp2eyPfP0gICI&usqp=CAU' 
                        className='cross' 
                        alt="" 
                    />
                </div>
                
                {error && <div className="error-message">{error.message}</div>}
                
                <form onSubmit={onSubmitHandler} className="login-popup-inputs">
                    {currentState === 'Sign up' && (
                        <>
                            <input 
                                onChange={onChangeHandler}  
                                name="name"  
                                type="text" 
                                placeholder='Your name (20-60 characters)' 
                                minLength="20"
                                maxLength="60"
                                required 
                            />
                            <input 
                                onChange={onChangeHandler} 
                                name='address' 
                                type="text" 
                                placeholder='Address (max 400 characters)' 
                                maxLength="400"
                                required 
                            />
                            <select 
                                onChange={onChangeHandler} 
                                name="role"
                                value={data.role}
                            >
                                <option value="normal_user">Normal User</option>
                                <option value="store_owner">Store Owner</option>
                                <option value="system_admin">System Admin</option>
                            </select>
                        </>
                    )}
                    <input 
                        onChange={onChangeHandler} 
                        name='email'  
                        type="email" 
                        placeholder='Your email' 
                        required 
                    />
                    <input 
                        onChange={onChangeHandler}  
                        name='password' 
                        type="password" 
                        placeholder='Password (8-16 chars with uppercase & special char)' 
                        minLength="8"
                        maxLength="16"
                        required 
                    />
                    <button type="submit">
                        {currentState === 'Sign up' ? 'Create Account' : 'Login'}
                    </button>
                </form>
                <div className="login-popup-bottom">
                    <input type="checkbox" required />
                    <p>By continuing, you agree with company terms and agreement</p>
                </div>
                <div className="login-popup-last">
                    {currentState === 'Sign up' ? (
                        <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login</span></p>
                    ) : (
                        <p>Don't have an account? <span onClick={() => setCurrentState('Sign up')}>Click here</span></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;