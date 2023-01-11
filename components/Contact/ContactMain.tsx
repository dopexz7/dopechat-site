import { FC, useState } from "react";
import * as Bs from "react-icons/bs";
import { Modal } from "@mantine/core";
import { supabase } from "../../lib/supabaseClient";
import React from "react";

const ContactMain:FC<ContactMainTypes> = ({ btnClass, iconClass, text }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit:Function = async () : Promise<void> => {
    let re = /\S+@\S+\.\S+/;
    let isEmailValid = re.test(userEmail);
    setLoading(true);
    
    if (message && message.length >= 20 && userEmail && isEmailValid === true) {
      setError("");
      await supabase
        .from("contactus")
        .insert([{ email: userEmail, message: message }]);
      setLoading(false);
      setDisabled(true);
    }

    if (!userEmail || isEmailValid === false) {
      setLoading(false);
      return setError("Please provide an email!");
    } else if (!message || message.length < 20) {
      setLoading(false);
      return setError("Please provide a message.");
    }
  };
  return (
    <>
      <div onClick={() => setVisible(true)} className={btnClass}>
        <span className='absolute group-hover:opacity-50 text-ma-pink duration-200 opacity-0 blur-md'>Contact us</span>
        <Bs.BsChatSquareTextFill className={iconClass} />
        {text ? text : "Contact us"}
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
              <Bs.BsChatSquareTextFill />
            </div>
          </div>

        <div className="flex flex-col space-y-3 text-white ">
          <div>Send a message!</div>
          <div className="opacity-50 text-sm">
            Report bugs/issues, suggest ideas, request emote sets
          </div>
        </div>
        <div className="flex-col flex w-full mt-6">
          {error && (
            <div className="remove text-white justify-center mb-3 text-xs bg-border-white rounded font-normal px-2 py-3  flex flex-row items-center">
              {error}
            </div>
          )}

          <input
            required
            value={userEmail}
            placeholder="Your email"
            onChange={(e: any) => setUserEmail(e.target.value)}
            className="p-2 px-4 bg-transparent border-[1px] border-white border-opacity-5 rounded-3xl text-white"
          />
          <textarea
            required
            value={message}
            placeholder="Your message"
            onChange={(e: any) => setMessage(e.target.value)}
            className="mt-2 p-2 px-4 bg-transparent border-[1px] border-white border-opacity-5 rounded-3xl text-white" 

          />
          
          <p className="text-xs font-light mt-1 text-main-purple ">
            If you&apos;re requesting an emote set, please include a link to your Facebook Gaming Page.
          </p>

          <div className="w-full flex flex-col space-y-3 mt-6">
          <div
            onClick={() =>
              disabled
                ? setError("Wait before sending more messages!")
                : handleSubmit()
            }
            className={`flex uppercase overflow-hidden relative duration-300 ${loading ? "bg-white" : "hover:bg-white text-black bg-ma-pink"} px-10  cursor-pointer py-3 rounded-3xl items-center justify-center font-bold w-full before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl`}
          >
            {loading ? "Sending..." : "Send message"}
          </div>
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
export default ContactMain

interface ContactMainTypes {
  btnClass?: string;
  iconClass?: string;
  text?: string;
}