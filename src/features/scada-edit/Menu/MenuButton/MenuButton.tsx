import { darkBlue2 } from '@/assets/color';
import { flexVerticalCenter } from '@/style/style';
import { Collapse, Paper } from '@mui/material';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { RiArrowDropDownLine } from 'react-icons/ri';

type MenuButtonProps = {
  icon: IconType;
  text: string;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
};

const MenuButton = ({ icon: Icon, text, children, isOpen, onClick }: MenuButtonProps) => {
  isOpen = isOpen ?? false;
  onClick = onClick ?? (() => {});
  return (
    <div css={{ position: 'relative' }}>
      <div onClick={onClick} css={[{ color: '#fff', cursor: 'pointer' }, flexVerticalCenter]}>
        <Icon />
        <span css={{ marginLeft: 4 }}>{text}</span>
        <RiArrowDropDownLine />
      </div>
      <Collapse
        in={isOpen}
        sx={{
          position: 'absolute',
          top: '100%',
          left: '0',
          zIndex: 40
        }}
      >
        <Paper
          sx={{
            m: 1,
            backgroundColor: darkBlue2,
            padding: '20px',
            borderRadius: 4
          }}
          elevation={4}
        >
          {children}
        </Paper>
      </Collapse>
    </div>
  );
};

export default MenuButton;
