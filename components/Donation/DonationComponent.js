import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as Bi from "react-icons/bi";
import { NumberInput } from "@mantine/core";
import { Modal } from "@mantine/core";
import { motion } from "framer-motion";
import * as Fa from "react-icons/fa";
import ButtonWrapper from "./ButtonWrapper";

export default function DonationComponent({ btnClass, iconEnabled }) {
  const [visible, setVisible] = useState(false);
  const [seeDonation, setSeeDonation] = useState(false);
  const [amount, setAmount] = useState("5");
  const currency = "USD";

  const amounts = [
    {
      amount: "5",
    },
    {
      amount: "10",
    },
    {
      amount: "15",
    },
  ];
  const iconVariant = {
    hover: {
      scale: 1.05,
      rotate: 360,
    },
    transition: {
      yoyo: 1,
    },
  };
  return (
    <>
      <div onClick={() => setVisible(true)} className={btnClass}>
        {iconEnabled ? <Fa.FaPaypal className="mr-1" /> : ""}
        Donate
      </div>
      <Modal
        opened={visible}
        onClose={() => setVisible(false)}
        classNames={{
          root: "backdrop-blur-2xl",
          modal:
            "text-center rounded-lg bg-header-bg bg-main-purple bg-blend-multiply ",
        }}
        size="sm"
        centered
      >
        <div className="flex justify-center items-center mb-3">
          <motion.div
            variants={seeDonation ? iconVariant : ""}
            whileInView="hover"
            className="text-lg !text-main-purple bg-border-white p-4 rounded-2xl"
          >
            <Bi.BiDonateHeart />
          </motion.div>
        </div>

        <div className="flex flex-col space-y-3 text-white">
          <div>Donate</div>
          <div className="opacity-75 text-sm">Thanks for your support!</div>
        </div>
        <div className="flex-col flex w-full mt-3">
          <div className="h-72 flex flex-col w-full text-white">
            {seeDonation ? (
              <>
                <div className="flex flex-row items-center self-center p-3">
                  Donate with
                  <Fa.FaPaypal className="ml-1" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex mb-3 font-semibold overflow-hidden text-sm rounded flex-row items-center bg-border-white text-main-black">
                    {amounts.map((data, index) => (
                      <div
                        key={index}
                        className={`${
                          amount === data.amount
                            ? "bg-main-purple text-white"
                            : "hover:bg-main-purple hover:text-white"
                        } p-3 px-6  duration-300  cursor-pointer w-full`}
                        onClick={() => setAmount(data.amount)}
                      >
                        {data.amount}$
                      </div>
                    ))}

                    <div className="p-1">
                      <NumberInput
                        classNames={{
                          wrapper: "w-24",
                          withIcon: "your-withIcon-class",
                          input: "border-0 bg-accent-white rounded",
                          rightSection: "border-0 rounded-2xl ",
                        }}
                        min="0"
                        value={parseInt(amount)}
                        onChange={(e) => setAmount(e.toString())}
                        defaultValue={parseInt(amount)}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        formatter={(value) =>
                          !Number.isNaN(parseFloat(value))
                            ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : "$ "
                        }
                      />
                    </div>
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    <ButtonWrapper currency={currency} amount={amount} />
                  </PayPalScriptProvider>
                </motion.div>
              </>
            ) : (
              <div className="flex flex-col mt-6 text-white opacity-50">
                <div className="">
                  If you decide that I&apos;ve been doing a good job, click that
                  donate button to directly support me!
                </div>
                <div className="text-xs font-normal mt-3">
                  Donations are completely optional, however, are greatly
                  appreciated!
                </div>
                <div className="text-xs font-normal mt-3">
                  Donations are non-refundable.
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex flex-row space-x-3">
            <div
              onClick={() => setVisible(false)}
              className="group hover:bg-white border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"
            >
              <span className="opacity-75 font-normal group-hover:opacity-100">
                Cancel
              </span>
            </div>

            <div
              onClick={() => setSeeDonation(!seeDonation)}
              className={`${
                seeDonation
                  ? "bg-white hover:bg-darker-purple hover:text-white"
                  : "hover:bg-white text-white hover:text-main-purple"
              } border-white border-opacity-50 shadow-2xl  duration-300 border-2 font-normal  cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full`}
            >
              {seeDonation ? "Back" : "Start"}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
