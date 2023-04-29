import { deepDark, primaryBlue } from '@/assets/color';
import { flexVerticalCenter } from '@/style/style';
import React from 'react';
import { MdTouchApp } from 'react-icons/md';

type Props = {};

const Header = (props: Props) => {
  return (
    <header
      css={[
        flexVerticalCenter,
        {
          height: '50px',
          backgroundColor: deepDark,
          paddingLeft: 20
        }
      ]}
    >
      <div css={{ marginRight: 8 }}>
        <MdTouchApp fill={primaryBlue} fontSize={22} />
      </div>
      <div css={{ fontWeight: 600 }}>SCADA</div>
    </header>
  );
};

export default Header;
