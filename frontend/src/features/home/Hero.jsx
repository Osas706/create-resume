import React from "react";
import { ArrowRight, Star } from "lucide-react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

import Image1 from '../../assets/imgs/ped.jpg';
import Image2 from '../../assets/imgs/pry.jpg';
import Image3 from '../../assets/imgs/ala.jpg';
import Image4 from '../../assets/imgs/sma.jpg';
import Image5 from '../../assets/imgs/hot.jpg';

function Hero() {
  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
        <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

        {/* Avatars + Stars */}
        <div className="flex items-center mt-24">
          <div className="flex -space-x-3 pr-3">
            <img
              src={Image1}
              alt="user1"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1"
            />
            <img
              src={Image2}
              alt="user2"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2"
            />
            <img
              src={Image3}
              alt="user3"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-3"
            />
            <img
              src={Image4}
              alt="user4"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-4"
            />
            <img
            src={Image5}
              alt="user5"
              className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-5"
            />
          </div>

          <div>
            <div className="flex ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} size={13} fill="black" />
                ))}
            </div>
            <p className="text-sm text-gray-700">Used by 10,***+ Users</p>
          </div>
        </div>

        {/* Headline + Contact */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
          Land your dream job with{" "}
          <span className=" bg-linear-to-r from-indigo-700 to-indigo-600 bg-clip-text text-transparent text-nowrap">
            AI-powered
          </span>{" "}
          resumes.
        </h1>

        <p className="max-w-md text-center text-base my-7">
          Explore a growing library of over 320+ beautifully crafted,
          customizable components.
        </p>

        {/* Get started Button */}
        <div className="flex items-center gap-4 ">
          <Link to='/app' className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-indigo-400 flex items-center transition-colors">
            Get started
            <ArrowRight size={20} />
          </Link>
        </div>

        <p className="py-6 text-slate-600 mt-14">
          Trusting by leading brands, including
        </p>

        {/* compamy logos */}
        <div id="logo-container"
          className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4"
        >
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="logo"
              className="h-6 w-auto max-w-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
