import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const StoreDetails = () => {
 
 
    
      const [storeDetails, setStoreDetails] = useState(null)
      const {id} = useParams()
      const {url, token} = useContext(StoreContext)
      
  
      useEffect(() => {
          const fetchStoreDetails = async() => {
              if (!token) {
                  console.log('No token available')
              }
  
              try {
                 
                  const response = await axios.get(`${url}/api/stores/${id}`, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  })
                  if(response.data.success){
                      setStoreDetails(response.data.data)
                  }            
              } catch (error) {
                  console.error('Error fetching store details:', error)
              } 
          }
          fetchStoreDetails()
      }, [id, token, url])  // Added token as dependency
  
      
      if (!storeDetails) return <div>Store not found</div>
  
      return (
          <div className='storeDetails'>
             
          </div>
      )
  }


export default StoreDetails
