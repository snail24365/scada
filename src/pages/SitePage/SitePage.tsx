import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import DigitalTwinPage from './DigitalTwinPage';
import SiteMainPage from './SiteMainPage';

type Props = {};

const SitePage = (props: Props) => {
  const { pathname } = useLocation();
  const showMainPage = pathname === '/site';
  const showDigitalTwin = pathname.includes('/site/');

  return (
    <div css={{ flexGrow: 1, position: 'relative' }}>
      <AnimatePresence>{showMainPage && <SiteMainPage />}</AnimatePresence>
      <AnimatePresence>{showDigitalTwin && <DigitalTwinPage />}</AnimatePresence>
    </div>
  );
};

export default SitePage;
