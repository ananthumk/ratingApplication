import React from 'react';
import './Home.css';
import DisplayStore from '../../components/DisplayStore/DisplayStore';
import Banner from '../../components/Banner/Banner';

const Home = () => {
  return (
    <div className="home">
      <Banner />
      
      <DisplayStore />
    </div>
  );
};

export default Home;