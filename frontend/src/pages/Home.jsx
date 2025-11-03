import React from "react";
import Banner from "../features/home/Banner";
import Hero from "../features/home/Hero";
import Features from "../features/home/Features";
import Testimonial from "../features/home/Testimonial";
import NewsLetter from "../features/home/NewsLetter";
import Footer from "../features/home/Footer";

function Home() {
  return (
    <>
      <Banner />
      <Hero /> 
      <Features />
      <Testimonial />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default Home;
