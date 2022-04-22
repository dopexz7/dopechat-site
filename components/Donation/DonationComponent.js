import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as Bi from "react-icons/bi";
import { NumberInput } from "@mantine/core";
import StyledTabs from "../Misc/StyledTabs";
import { Tabs, Modal } from "@mantine/core";
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
          modal: "text-center rounded-lg",
        }}
        size="sm"
        centered
      >
        <div className="flex justify-center items-center mb-3">
          <div className="text-lg !text-main-purple bg-border-white p-4 rounded-2xl">
            <Bi.BiDonateHeart />
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div>Donate</div>
          <div className="text-accent-gray text-sm">
            Thanks for your support!
          </div>
        </div>
        <div className="flex-col flex w-full mt-3">
          <div className="h-72 flex w-full">
            {seeDonation ? (
              <>
                <StyledTabs>
                  <Tabs.Tab label="Benefits">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex flex-col text-main-black text-sm space-y-2 font-semibold mt-3">
                        <span>Donate 5$ or more to:</span>
                        <span className="bg-border-white p-1 rounded-md text-xs">
                          Increase emote upload limit up to 20 daily
                        </span>

                        <span className="bg-border-white p-1 rounded-md text-xs">
                          Gain input on new global emotes
                        </span>

                        <span className="bg-border-white p-1 rounded-md text-xs">
                          1 global emote (limited spaces for first supporters)
                        </span>
                        <span className="text-xs">
                          There are more benefits coming soon and I&apos;m
                          always trying to find ways to thank my supporters!
                        </span>
                        {/* <span className="bg-border-white p-1 rounded-md text-xs">
                        Create a personal emote set, share the code with friends
                        and use it in the extension (up to 10 emotes) (SOON)
                      </span> */}
                        {/* <span className="bg-border-white p-1 rounded-md text-xs">
                          Zero width emotes (SOON: not in the near future)
                        </span>
                        <span className="bg-border-white p-1 rounded-md text-xs">
                          Custom badge (upload a custom image, get approved by
                          mods, everyone can see it) (SOON: not in the near
                          future)
                        </span> */}
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
                        <ButtonWrapper currency={currency} amount={amount} />
                      </PayPalScriptProvider>
                      <div className="text-xs font-normal text-main-black mt-6">
                        First priority is to upgrade the whole dopeChat with
                        better services & servers, further improving user
                        experience.
                      </div>
                    </motion.div>
                  </Tabs.Tab>
                </StyledTabs>
              </>
            ) : (
              <div className="flex flex-col mt-6">
                <div className="text-main-black">
                  If you decide that I&apos;ve been doing a good job, click that
                  donate button to directly support me!
                </div>
                <div className="text-xs font-normal text-main-black mt-3">
                  Donations are completely optional, however, are greatly
                  appreciated!
                </div>
                <div className="text-xs font-normal text-main-black mt-3">
                  Donations are non-refundable.
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex flex-row space-x-3">
            <div
              onClick={() => setVisible(false)}
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
          </div>
        </div>
      </Modal>
    </>
  );
}
