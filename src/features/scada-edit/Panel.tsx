import { darkBlue2, primaryBlue, primaryGrey } from '@/assets/color';
import { scrollbar } from '@/style/style';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  isOpen: boolean;
  width?: number | string;
  setOpen?: (isOpen: boolean) => void;
  contents?: React.ReactNode;
  backgroundColor?: string;
};

const Panel = (props: Props) => {
  const panelWidth = props.width ?? 400;
  const backgroundColor = props.backgroundColor ?? darkBlue2;
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          initial={{ opacity: 0, right: -panelWidth }}
          animate={{ opacity: 1, right: 0 }}
          exit={{ opacity: 0, right: -panelWidth }}
          css={{
            position: 'absolute',
            top: '0px',
            zIndex: 50,
            right: '10px',
            height: '100%',
            width: panelWidth,
            padding: 15
          }}
        >
          <div
            css={[
              scrollbar,
              {
                borderRadius: 10,
                padding: '15px 25px',
                backgroundColor,
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden'
              }
            ]}
          >
            {props.contents}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Panel;
