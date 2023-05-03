import { flexCenter } from '@/style/style';
import { motion } from 'framer-motion';

const EmptyWindow = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, delay: 0.2 }}
    css={[flexCenter, { width: '100%', height: '100%', flexDirection: 'column' }]}
  >
    <div
      css={[
        flexCenter,
        { width: 220, height: 220, fontSize: 19, textAlign: 'center', color: '#666', flexDirection: 'column' }
      ]}
    >
      To edit property
      <br /> Select component
    </div>
  </motion.div>
);

export default EmptyWindow;
