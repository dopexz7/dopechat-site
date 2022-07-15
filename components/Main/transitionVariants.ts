export const leftToRightVariant = {
  offscreen: {
    x: -150,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "fade",
      fade: 0.4,
      duration: 0.8,
    },
  },
};
export const rightToLeftVariant = {
  offscreen: {
    x: 150,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "fade",
      fade: 0.4,
      duration: 0.8,
    },
  },
};
export const topToBottomVariant = {
  offscreen: {
    y: -50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "fade",
      fade: 0.4,
      duration: 0.8,
    },
  },
};

export const bottomToTopVariant = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "fade",
      fade: 0.4,
      duration: 0.8,
    },
  },
};
