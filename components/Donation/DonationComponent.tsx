import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as Bi from "react-icons/bi";
import { NumberInput } from "@mantine/core";
import StyledTabs from "../Misc/StyledTabs";
import { Modal } from "@supabase/ui";
import { Tabs } from "@mantine/core";
import { motion } from "framer-motion";
import * as Fa from "react-icons/fa";
import ButtonWrapper from "./ButtonWrapper";
export default function DonationComponent({ username }) {
  const [visible, setVisible] = useState(false);
  const [seeDonation, setSeeDonation] = useState(false);
  const [amount, setAmount] = useState("5");
  const currency = "USD";
  function toggle() {
    setVisible(!visible);
  }

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
  return (
    <>
      <div
        onClick={toggle}
        className="hover:border-main-purple hover:bg-main-purple hover:text-white duration-300 border-2 font-normal text-main-black cursor-pointer flex justify-center items-center p-3 rounded-xl w-full"
      >
        Donate
      </div>
      <Modal
        className="backdrop-blur mt-auto mb-auto"
        title={"Donate"}
        description={"Thanks for your support!"}
        visible={visible}
        onCancel={toggle}
        onConfirm={toggle}
        footerBackground
        closable
        customFooter={[
          <div className="w-full flex flex-row space-x-3" key={0}>
            <div
              onClick={toggle}
              className="p-2 text-center bg-border-white text-main-black font-medium text-sm rounded cursor-pointer duration-300 w-full"
            >
              Cancel
            </div>

            <div
              onClick={() => setSeeDonation(!seeDonation)}
              className="p-2 text-center bg-main-purple text-white font-medium text-sm rounded cursor-pointer duration-300 w-full"
              style={{ background: "var(--main-purple)" }}
            >
              {seeDonation ? "Back" : "Start"}
            </div>
          </div>,
        ]}
        layout="vertical"
        size="small"
        contentStyle={{
          background: "transparent !important",
        }}
        icon={
          <div className="text-lg !text-main-purple bg-border-white p-4 rounded-2xl">
            <Bi.BiDonateHeart />
          </div>
        }
      >
        <div className="!h-80 flex w-full">
          {seeDonation ? (
            <>
              <StyledTabs>
                <Tabs.Tab label="Benefits">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col text-main-black text-sm space-y-2 font-semibold">
                      <span>Donate 5$ or more to:</span>
                      <span className="bg-border-white p-1 rounded-md text-xs">
                        Increase emote upload limit up to 20 daily
                      </span>
                      <span className="bg-border-white p-1 rounded-md text-xs">
                        Increase your personal emote set capacity from 5 to 10!
                        (for non-streamers)
                      </span>
                      <div className=" text-xs font-normal">
                        My first priority is to update the extension and upgrade
                        the whole dopeChat with paid (not free, as it is
                        currently) services & servers, further improving user
                        experience.
                      </div>
                    </div>
                  </motion.div>
                </Tabs.Tab>
                <Tabs.Tab
                  label={
                    <div className="flex flex-row items-center">
                      Donate with
                      <Fa.FaPaypal className="ml-1" />
                    </div>
                  }
                >
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
                          } p-3 px-6  duration-300  cursor-pointer`}
                          onClick={() => setAmount(data.amount)}
                        >
                          {data.amount}$
                        </div>
                      ))}
                      {/* <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-transparent border-2 border-white p-3"
                    /> */}
                      <div className="p-1">
                        <NumberInput
                          value={parseInt(amount)}
                          onChange={(e?) => setAmount(e.toString())}
                          defaultValue={parseInt(amount)}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          formatter={(value) =>
                            !Number.isNaN(parseFloat(value))
                              ? `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
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
                      <ButtonWrapper
                        currency={currency}
                        amount={amount}
                        username={username}
                      />
                    </PayPalScriptProvider>
                  </motion.div>
                </Tabs.Tab>
              </StyledTabs>
            </>
          ) : (
            <div className="flex flex-col justify-center">
              <div className="text-main-black">
                Every contribution helps a lot for this and other upcoming
                projects
                <img
                  alt="PauseChamp"
                  className="w-5 h-5 inline-block ml-1"
                  src="https://cdn.betterttv.net/emote/61686a6d054a252a431f0ea8/3x"
                />
              </div>
              <div className="text-main-black mt-3 text-sm">
                Right now the extension and the website runs on completely free
                services(servers), thus it could sometimes impact the user
                experience negatively. As I am a student and basically
                developing this all by myself, I just cannot afford to pay for
                everything.
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
