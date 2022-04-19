import { useState } from "react";
import { Modal } from "@supabase/ui";
import * as Bs from "react-icons/bs";
import { Input } from "@supabase/ui";
import { supabase } from "../../lib/supabaseClient";
export default function ContactMain({ btnClass, iconClass }) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  function toggle() {
    setVisible(!visible);
  }

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

  return (
    <>
      <div onClick={toggle} className={btnClass}>
        <Bs.BsChatSquareTextFill className={iconClass} /> Contact us
      </div>

      <Modal
        className={`backdrop-blur-2xl mt-auto mb-auto`}
        title={"Send a message"}
        description={"Report bugs/issues, suggest ideas"}
        visible={visible}
        onCancel={toggle}
        onConfirm={toggle}
        footerBackground
        closable
        customFooter={[
          <div className="w-full flex flex-col space-y-3" key={0}>
            <div
              onClick={() =>
                disabled
                  ? setError("Wait before sending more messages!")
                  : handleSubmit()
              }
              className="p-2 text-center bg-main-purple text-white font-medium text-sm rounded cursor-pointer duration-300 w-full"
              style={{ background: "var(--main-purple)" }}
            >
              {loading ? "Sending..." : "Send message"}
            </div>
            <div
              onClick={toggle}
              className="p-2 text-center bg-border-white text-main-black font-medium text-sm rounded cursor-pointer duration-300 w-full"
            >
              Cancel
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
            <Bs.BsChatSquareTextFill />
          </div>
        }
      >
        <div className="flex-col flex w-full">
          {error && (
            <div className="remove text-white justify-center mb-3 text-xs bg-border-white rounded font-normal px-2 py-3  flex flex-row items-center">
              {error}
            </div>
          )}

          <Input
            label="Your email"
            required
            value={userEmail}
            placeholder="required"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Input.TextArea
            label="Your message"
            limit={280}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-6"
            placeholder="Message..."
            type="text"
            labelOptional="min 20 characters"
          />
        </div>
      </Modal>
    </>
  );
}
