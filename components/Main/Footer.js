import React from "react";
import Image from "next/image";
export default function Footer() {
  return (
    <div
      className="winScl:scale-90 flex text-accent-gray justify-center"
      id="section6"
    >
      <div className="flex flex-col mb-6 text-xs space-y-1 justify-center items-center">
        <Image
          width={40}
          height={40}
          src="https://i.imgur.com/a1AhdsO.png"
          alt="dopeChat"
        />
        <div>© All rights reserved</div>
        <div className="">
          made by <span className="text-darker-purple font-bold">dope</span>,
          2022
        </div>
      </div>
    </div>
  );
}
