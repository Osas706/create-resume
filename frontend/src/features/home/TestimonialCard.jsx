import { BadgeCheck } from "lucide-react";
import React from "react";

function TestimonialCard({ card }) {
  return (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full"
          src={card.image}
          alt="User Image"
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            {card.verified && <BadgeCheck size={20} color="#1E4BAF" absoluteStrokeWidth />}
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm py-4 text-gray-800">
        {card.testimony}
      </p>
    </div>
  );
}

export default TestimonialCard;