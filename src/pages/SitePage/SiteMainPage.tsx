import LocationWindow from '@/features/site/LocationWindow';
import SiteMap from '@/features/site/SiteMap';
import { full } from '@/style/style';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {};

const SiteMainPage = (props: Props) => {
  const { state } = useLocation();

  const pattern = /^\/site\/(.*)$/;

  const isFromDetailPage = pattern.test(state?.prevPath);

  const frameAnimation = isFromDetailPage
    ? {
        initial: { transform: 'translate(-100%)' },
        animate: { transform: 'translate(0%)' },
        exit: { transform: 'translate(-100%)' },
        transition: { ease: 'easeInOut', duration: 0.4 }
      }
    : {
        exit: { transform: 'translate(-100%)' }
      };

  useEffect(() => {}, []);

  return (
    <motion.div
      key="mapBoxSection"
      {...frameAnimation}
      css={{ ...full, position: 'relative', backgroundColor: '#202020' }}
    >
      <SiteMap />
      <LocationWindow />
    </motion.div>
  );
};

export default SiteMainPage;
