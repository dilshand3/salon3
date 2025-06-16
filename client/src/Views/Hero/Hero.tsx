import React from 'react';
import "./Hero.css";
import HeroForm from '@/components/HeroForm/HeroForm';

const Hero : React.FC = () => {
  return (
    <div className='heroContainer'>
      <h1 className='heroTitle'>
      Book local beauty and wellness services
      </h1>
      <HeroForm/>
    </div>
  )
}

export default Hero;