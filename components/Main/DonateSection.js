import React from "react";
import Script from "next/script";
import { Fade } from "react-reveal";
import * as Fa from "react-icons/fa";
export default function DonateSection() {
  return (
    <div
      className="p-6 lg:p-0 winScl:scale-90 winScl:mt-0 flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-screen"
      id="section4"
    >
      <div className="flex flex-col w-full lg:w-1/4">
        <Script
          id="paypal-sdk-x"
          src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
          onLoad={() => {
            return (
              <Script id="kekw">
                {PayPal.Donation.Button({
                  env: "production",
                  hosted_button_id: "BBESL24DMEABC",
                  image: {
                    src: "https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif",
                    alt: "Donate with PayPal",
                    title: "Donate using Paypal",
                  },
                }).render("#paypal-button-container")}
              </Script>
            );
          }}
        ></Script>
        <Fade left>
          <div className="paypal-button group">
            <div id="paypal-button-container" />
            <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-accent-white pointer-events-none duration-300 border-2 group-hover:bg-darker-purple group-hover:border-darker-purple group-hover:text-white flex-row items-center justify-center flex  p-6 text-accent-purple font-bold rounded-3xl">
              <Fa.FaPaypal className="mr-3" />
              <div className="flex flex-col">Donate with Paypal</div>
            </div>
          </div>
        </Fade>
      </div>
      <Fade right>
        <div className="w-full lg:w-3/4 flex flex-col ml-10">
          <h3 className="hidden lg:flex text-xs lg:text-sm font-bold text-accent-gray ml-auto">
            donate
          </h3>

          <h1 className=" hidden lg:flex text-2xl lg:text-6xl font-bold ml-auto lg:font-normal text-main-black mt-6 tracking-tight">
            Support the creator!
          </h1>

          <h1 className="flex text-sm lg:ml-auto lg:text-right font-bold lg:font-bold text-accent-gray mt-6 mr-6 lg:mr-0 tracking-tight">
            note: this is purely for donations to support the creator! If you
            want any benefits, check out subscription in the dashboard!
          </h1>
        </div>
      </Fade>
    </div>
  );
}
