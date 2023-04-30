import { darkBlue } from '@/assets/color';
import { fadeInOut } from '@/style/style';
import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { editContextMenuState } from '../atom/scadaEditSectionAtom';

type Props = { onClick: React.MouseEventHandler; contents: React.ReactNode };

const EditContextMenuItem = ({ onClick, contents }: Props) => {
  const setEditContextMenu = useSetRecoilState(editContextMenuState);
  return (
    <motion.li
      onClick={(e) => {
        onClick(e);
        setEditContextMenu({ left: 0, top: 0, isOpen: false });
      }}
      {...fadeInOut}
      css={{
        padding: '10px 5px',
        '&:hover': {
          backgroundColor: darkBlue,
          color: 'white',
          cursor: 'pointer',
          transitionDuration: '0.5s'
        }
      }}
    >
      {contents}
    </motion.li>
  );
};

export default EditContextMenuItem;
