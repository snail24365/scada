import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

type Props = {};

const EquipmentPanel = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={{
            position: 'absolute',
            top: '0px',
            zIndex: 1000000,
            right: '10px',
            height: '100%',
            width: '300px',
            backgroundColor: '#fff',
            borderLeft: '1px solid #000',
          }}>
          Panel
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EquipmentPanel;
