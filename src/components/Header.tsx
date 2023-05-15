import { borderColor2, darkBlue5, primaryBlue } from '@/assets/color';
import { flexVerticalCenter } from '@/style/style';
import { ReactNode } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdTouchApp } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  let title = '';
  const iconSize = 22;

  let icon: ReactNode = null;
  switch (pathname) {
    case '/site':
      title = 'Site';
      icon = <MdTouchApp fill={primaryBlue} fontSize={iconSize} />;
      break;
    case '/':
      title = 'SCADA';
      icon = <AiFillHome fill={primaryBlue} fontSize={iconSize} />;
      break;
    default:
      break;
  }

  return (
    <header
      css={{
        ...flexVerticalCenter,
        height: '50px',
        backgroundColor: darkBlue5,
        paddingLeft: 20,
        borderBottom: `3px solid ${borderColor2}`
      }}
    >
      <div css={{ marginRight: 8 }}>{icon}</div>
      <div css={{ fontWeight: 600 }}>{title}</div>
    </header>
  );
};

export default Header;
