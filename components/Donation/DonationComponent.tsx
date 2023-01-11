import { FC, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as Bi from "react-icons/bi";
import { NumberInput } from "@mantine/core";
import { Modal } from "@mantine/core";
import { motion } from "framer-motion";
import * as Fa from "react-icons/fa";
import ButtonWrapper from "./ButtonWrapper";

const DonationComponent:FC<donationComponentTypes> = ({ btnClass, iconEnabled }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("5");
  const currency = "USD";

  const amounts : any[] = [
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
          root: "",
          modal:
            "backdrop-blur-sm text-center rounded-2xl bg-black border-2 border-white border-opacity-5 bg-opacity-50  ",
        }}
        size="sm"
        centered
      >
        <div className="flex justify-center items-center mb-3">
          <div
            className="text-lg text-black bg-ma-pink p-3 rounded-2xl">
            <Bi.BiDonateHeart />
          </div>
        </div>

        <div className="flex flex-col space-y-3 text-white">
          <div>Donate</div>
          <div className="opacity-75 text-sm">Thanks for your support!</div>
        </div>
        <div className="flex-col flex w-full mt-3">
          <div className="h-72 flex flex-col w-full text-white">
              
                <div className="flex flex-row items-center self-center p-3">
                  Donate with
                  <Fa.FaPaypal className="ml-1" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex mb-3 font-semibold overflow-hidden text-sm rounded-2xl flex-row items-center bg-white text-black">
                    {amounts.map((data, index) => (
                      <div
                        key={index}
                        className={`${
                          amount === data.amount
                            ? "bg-ma-pink text-black"
                            : "hover:bg-ma-pink hover:text-black"
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
                          input: "border-0 !bg-black !bg-opacity-20 rounded-2xl",
                          rightSection: "border-0 rounded-2xl ",
                        }}
                        min={0}
                        value={parseInt(amount)}
                        onChange={(e : any) => setAmount(e.toString())}
                        defaultValue={parseInt(amount)}
                        parser={(value : any) => value.replace(/\$\s?|(,*)/g, "")}
                        formatter={(value : any) =>
                          !Number.isNaN(parseFloat(value))
                            ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : "$ "
                        }
                      />
                    </div>
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as any,
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    <ButtonWrapper currency={currency} amount={amount} />
                  </PayPalScriptProvider>
                </motion.div>           
          </div>
          <div className="w-full flex flex-row space-x-3">
            <div
              onClick={() => setVisible(false)}
              className="flex uppercase overflow-hidden relative duration-300 bg-white px-10 text-black cursor-pointer py-3 hover:bg-ma-pink rounded-3xl items-center justify-center font-bold w-full before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl"
              >
              Cancel
            </div> 
          </div>
        </div>
      </Modal>
    </>
  );
}
export default DonationComponent;

interface donationComponentTypes {
  btnClass: string;
  iconEnabled: boolean;
}
