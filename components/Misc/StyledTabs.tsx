import { motion } from "framer-motion";
import { Tabs } from "@mantine/core";

const StyledTabs = (props: any) => {
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
            "group text-white text-md px-6 py-3 w-1/2 font-semibold bg-transparent",
          tabActive: "!bg-white !text-main-purple",
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
};
export default StyledTabs;