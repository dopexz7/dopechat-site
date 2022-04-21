import { motion } from "framer-motion";
import { Tabs } from "@mantine/core";

export default function StyledTabs(props) {
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
          tabInner: "group-hover:scale-95 group-hover:opacity-75 duration-300 ",
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
