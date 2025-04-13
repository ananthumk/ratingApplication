import React, { useContext, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import './DisplayStore.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const DisplayStore = () => {

  const { storeData, url, token } = useContext(StoreContext)
  const navigate = useNavigate()

  const [rating, setRating] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [id, setId] = useState(null)

  const submitRating = async (id) => {
    const data = { id, rating }
    const response = await axios.post(url + '/api/ratings/', {
      headers: {
        Authoriation: `Bearer ${token}`
      }
    }, data)
    if(response.data.success){
      console.log('updated')
    }
  }

  return (
    <div className='display-store'>
      <h2>Stores</h2>
      <div className='container'>
        {
          storeData.map((stores) => {
            return (
              <div key={stores.id} className='store'>
                <div className='store-details'>
                  <h3>{stores.name}</h3>
                  <div className='rating-container'>
                    <div className='rating'>
                      <div onClick={() => {
                        setShowRating(true);
                        setId(stores.id);
                      }}
                        className='rating-display'>
                        <FaStar />
                        <p>{stores.average_rating}.0</p>
                      </div>
                      {showRating && stores.id === id &&
                        (<div className='rating-submit'  >
                          <input onChange={(e) => setRating(e.target.value)} value={rating} type="number" placeholder='give a rating from 1 to 5' required />
                          <button onClick={() => {
                            setShowRating(false);
                            submitRating(stores.id);
                          }}
                            className='submit-btn'>Submit</button>
                        </div>)}
                    </div>
                    <p className='rating-count'>{stores.rating_count} Ratings</p>
                  </div>
                  <div className='address-container'>
                    <FaLocationDot />
                    <p>{stores.address}</p>
                  </div>
                  <div className='contact-info'>
                    <MdEmail className='mail-icon' />
                    <p>{stores.email}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DisplayStore
