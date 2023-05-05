import { darkBlue5, borderColor2, primaryBlue } from '@/assets/color';
import { flexVerticalCenter } from '@/style/style';
import React from 'react';
import { MdTouchApp } from 'react-icons/md';

const Header = () => {
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
      <div css={{ marginRight: 8 }}>
        <MdTouchApp fill={primaryBlue} fontSize={22} />
      </div>
      <div css={{ fontWeight: 600 }}>SCADA</div>
    </header>
  );
};

export default Header;
