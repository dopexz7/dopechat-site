import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import * as Bs from "react-icons/bs";
import * as Bi from "react-icons/bi";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { supabase } from "../lib/supabaseClient";
import { Modal } from "@supabase/ui";
import { Stepper, Tabs } from "@mantine/core";
import { motion } from "framer-motion";
import * as Fa from "react-icons/fa";

export default function DonationComponent({ username }) {
  const [visible, setVisible] = useState(false);
  const [seeDonation, setSeeDonation] = useState(false);
  function toggle() {
    setVisible(!visible);
  }

  // const [orderId, setOrderId] = useState();
  // const createMutation = useMutation<{ data: any }, AxiosError, any, Response>(
  //   (): any => axios.post("/api/paypal/createOrder")
  // );
  // const captureMutation = useMutation<string, AxiosError, any, Response>(
  //   (data): any => axios.post("/api/paypal/captureOrder", data)
  // );
  // const createPayPalOrder = async (): Promise<string> => {
  //   const response = await createMutation.mutateAsync({});
  //   setOrderId(response.data.orderID);
  //   return response.data.orderID;
  // };

  // const onApprove = async (data: OnApproveData): Promise<void> => {
  //   const { data: pepeg, error } = await supabase
  //     .from("donations")
  //     .update({ username: username, amount: "5" })
  //     .eq("orderID", orderId);

  //   return captureMutation.mutate({ orderID: data.orderID });
  // };
  function StyledTabs(props) {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Tabs
          variant="unstyled"
          classNames={{
            tabControl:
              "border-2 group text-main-black text-md px-6 py-3 w-1/2 font-semibold bg-border-white",
            tabActive: "!bg-main-purple !text-white",
            tabInner:
              "group-hover:scale-95 group-hover:opacity-75 duration-300 ",
          }}
          styles={() => ({
            tabControl: {
              "&:first-of-type": {
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              },

              "&:last-of-type": {
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
              },
            },
          })}
          {...props}
        />
      </motion.div>
    );
  }
  return (
    <>
      <div
        onClick={toggle}
        className="hover:border-main-purple hover:bg-main-purple hover:text-white duration-300 border-2 font-normal text-main-black cursor-pointer flex justify-center items-center p-3 rounded-xl w-full"
      >
        Donate
      </div>
      <Modal
        className="backdrop-blur"
        title={seeDonation ? "" : "Donate"}
        description={seeDonation ? "" : "Thanks for your support!"}
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
        {seeDonation ? (
          <>
            <StyledTabs>
              <Tabs.Tab label="Benefits">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col text-main-black text-sm">
                    <span>Donate 5$ or more to:</span>
                    <span>Increase emote upload limit up to 30 daily</span>
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
                  yoyo
                </motion.div>
              </Tabs.Tab>
            </StyledTabs>
          </>
        ) : (
          <>
            <div className="text-main-black">
              Every contribution helps a lot for this and other upcoming
              projects
              <img
                className="w-5 h-5 inline-block ml-1"
                src="https://cdn.betterttv.net/emote/61686a6d054a252a431f0ea8/3x"
              />
            </div>
          </>
        )}
      </Modal>
      {/* {toggleDonate ? (
        <>
          <PayPalScriptProvider
            options={{
              "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
              currency: "USD",
              commit: true,
            }}
          >
            <PayPalButtons
              style={{
                color: "white",
                shape: "pill",
                label: "paypal",
                tagline: false,
                height: 50,
              }}
              fundingSource={FUNDING.PAYPAL}
              createOrder={createPayPalOrder}
              onApprove={onApprove}
            />
          </PayPalScriptProvider>
          <div className="flex flex-row items-center text-sm px-3 text-accent-gray font-normal">
            <Bs.BsPatchCheckFill className="mr-2 text-main-purple text-xl" />
            Not currently donated.
          </div>
          <div className="duration-300 font-normal text-xs text-main-purple hover:text-main-white cursor-pointer px-3 rounded-xl">
            Donation benefits
          </div>
        </>
      ) : (
        ""
      )} */}
    </>
  );
}

declare global {
  interface Window {
    paypal: any;
  }
}

interface OnApproveData {
  billingToken?: string | null;
  facilitatorAccessToken: string;
  orderID: string;
  amount: string;
  payerID?: string | null;
  paymentID?: string | null;
  subscriptionID?: string | null;
  authCode?: string | null;
}
