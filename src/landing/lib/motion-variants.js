export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const blurResolve = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const accordionExpand = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { 
    height: 'auto', 
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  }
};
