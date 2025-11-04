import React from "react";
import Title from "./Title";
import TestimonialCard from "./TestimonialCard";
import { BookUser } from "lucide-react";

import Image1 from '../../assets/imgs/ash.jpg';
import Image2 from '../../assets/imgs/sma.jpg';
import Image3 from '../../assets/imgs/tre.jpg';
import Image4 from '../../assets/imgs/ala.jpg';
import Image5 from '../../assets/imgs/pry.jpg';
import Image6 from '../../assets/imgs/ped.jpg';
import Image7 from '../../assets/imgs/me.jpg';
import Image8 from '../../assets/imgs/hot.jpg';

function Testimonial() {
  const testimonialsData = [
    {
      image: Image1,
      name: "THE KINE",
      handle: "@asher_kine",
      testimony: "So easy to use — I built my CV in minutes!",
      verified: true
    },
    {
      image: Image2,
      name: "SMALLIE",
      handle: "@the_smallie",
      testimony: "Clean templates and no stress. Love it!",
      verified: true
    },
    {
      image: Image3,
      name: "Trey",
      handle: "@UTDTrey",
      testimony: "Helped me land my first interview — amazing tool.",
      verified: true
    },
    {
      image: Image4,
      name: "Alabi",
      handle: "@the_Lawrenz",
      testimony: "Simple, fast, and professional. Exactly what I needed.",
      verified: true
    },
  ];

  const testimonialsData2 = [
    {
      image: Image5,
      name: "Smallie",
      handle: "@PreshyUwa",
      testimony: "I'm not techy, but this made my resume look great!"
    },
    {
      image: Image6,
      name: "Peddras",
      handle: "@Peddras1",
      testimony: "Saved me hours of formatting — highly recommend."
    },
    {
      image: Image7,
      name: "iiam.winner",
      handle: "@iiamOsas",
      testimony: "Modern designs that actually impress recruiters."
    },
    {
      image: Image8,
      name: "hotmess",
      handle: "@IsaiahEgegele",
      testimony: "Best free resume builder I've tried — smooth and quick!”"
    },
  ];

  return (
    <div id="testimonials" className="space-y-4">
      {/* badge */}
      <div className="flex items-center gap-2 text-indigo-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1 w-max mx-auto">
        <BookUser color="#1E4BAF" size={18} />
        <span>Testimonials</span>
      </div>

      <Title
        title={"Don't just take our words"}
        description={
          "Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."
        }
      />

      {/* testimonials display */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...testimonialsData, ...testimonialsData].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-white to-transparent"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...testimonialsData2, ...testimonialsData2].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
}

export default Testimonial;
