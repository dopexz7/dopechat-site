import { FC, useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

const ButtonWrapper:FC<buttonWrapperTypes> = ({ currency, amount }) => {
  const user = useUser();
  const [{ options }, dispatch] = usePayPalScriptReducer();

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
        createOrder={(_data:any, actions:any) => {
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
            .then(async (orderId : any) => {
              await supabase
                .from("donations")
                .insert([{ orderID: orderId, status: "PENDING" }]);
              return orderId;
            });
        }}
        onApprove={(data : any, actions : any) => {
          return actions!.order!.capture().then(async () => {
            await supabase
              .from("donations")
              .update({
                username: user?.user_metadata.name,
                amount: amount,
                status: "COMPLETE",
              })
              .eq("orderID", data.orderID);
            if (parseInt(amount) >= 5) {
              await supabase
                .from("profiles")
                .update({
                  is_donor: true,
                })
                .eq("username", user?.user_metadata.name);
            }
          });
        }}
      />
    </>
  );
};

export default ButtonWrapper;

interface buttonWrapperTypes {
  currency: string;
  amount: string;
}
