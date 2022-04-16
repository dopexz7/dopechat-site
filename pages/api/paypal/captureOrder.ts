import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/paypal";
import { supabase } from "../../../lib/supabaseClient";
import paypal from "@paypal/checkout-server-sdk";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Capture order to complete payment
  const { orderID } = req.body;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  const response = await PaypalClient.execute(request);
  if (!response) {
    res.status(500);
  }
  // Update payment to PAID status once completed
  await supabase
    .from("donations")
    .update({ status: "PAID" })
    .eq("orderID", orderID);
  res.json({ ...response.result });
}
