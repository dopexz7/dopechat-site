import React, { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { supabase } from "../../lib/supabaseClient";
const ButtonWrapper = ({ currency, amount, username }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: "USD",
      },
    });
  }, [currency]);

  return (
    <>
      <PayPalButtons
        style={{
          color: "white",
          shape: "pill",
          label: "paypal",
          layout: "horizontal",
          tagline: false,
          height: 40,
        }}
        disabled={false}
        forceReRender={[amount, currency]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then(async (orderId) => {
              await supabase
                .from("donations")
                .insert([{ orderID: orderId, status: "PENDING" }]);
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(async () => {
            await supabase
              .from("donations")
              .update({
                username: username,
                amount: amount,
                status: "COMPLETE",
              })
              .eq("orderID", data.orderID);
            if (amount >= 5) {
              await supabase
                .from("profiles")
                .update({
                  is_donor: true,
                })
                .eq("username", username);
            }
          });
        }}
      />
    </>
  );
};

export default ButtonWrapper;
