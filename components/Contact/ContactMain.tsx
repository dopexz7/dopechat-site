import { FC, useState } from "react";
import * as Bs from "react-icons/bs";
import { Input, Modal, Textarea } from "@mantine/core";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
const ContactMain:FC<ContactMainTypes> = ({ btnClass, iconClass, text }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
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

  const iconVariant : any = {
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
        <Bs.BsChatSquareTextFill className={iconClass} />{" "}
        {text ? text : "Contact us"}
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
            variants={disabled ? iconVariant : ""}
            whileInView="hover"
            className="text-lg !text-main-purple bg-border-white p-4 rounded-2xl"
          >
            <Bs.BsChatSquareTextFill />
          </motion.div>
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

          <Input
            required
            value={userEmail}
            placeholder="Your email"
            onChange={(e: any) => setUserEmail(e.target.value)}
            classNames={{
              wrapper: "w-full",
              defaultVariant:
                "p-4 bg-transparent border-[1px] border-white border-opacity-5 rounded-3xl text-white",
            }}
          />
          <Textarea
            className="mt-3"
            placeholder="Message..."
            label=""
            value={message}
            classNames={{
              wrapper: "w-full",
              defaultVariant:
                "p-4 bg-transparent border-[1px] border-white border-opacity-5 rounded-3xl text-white",
            }}
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
          <p className="text-xs mt-1 text-white opacity-25">
            If you&apos;re requesting an emote set, please include your
            username.
          </p>

          <div className="w-full flex flex-col space-y-3 mt-6">
            <div
              onClick={() =>
                disabled
                  ? setError("Wait before sending more messages!")
                  : handleSubmit()
              }
              className="hover:bg-white border-white border-opacity-50 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"
            >
              {loading ? "Sending..." : "Send message"}
            </div>
            <div
              onClick={() => setVisible(false)}
              className="group hover:bg-white border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"
            >
              <span className="opacity-75 font-normal group-hover:opacity-100">
                Cancel
              </span>
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