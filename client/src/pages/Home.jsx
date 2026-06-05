import React from 'react'
import Banner from '../assets/components/home/Banner'
import Hero from '../assets/components/home/Hero'
import Features from '../assets/components/home/Features'
import Title from '../assets/components/home/Title'
import Testimonials from '../assets/components/home/Testimonials'
import CallToAction from '../assets/components/home/CallToAction'
import Footer from '../assets/components/home/Footer'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Title/>
      <Testimonials/>
      <CallToAction/>
      <Footer/>
    </div>
    
  )
}

export default Home