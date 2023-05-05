import { darkBlue1, primaryGrey } from '@/assets/color';
import { CSSObject } from '@emotion/styled';

export const flexCenter: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const flexVerticalCenter: CSSObject = {
  display: 'flex',
  alignItems: 'center'
};

export const flexHorizontalCenter: CSSObject = {
  display: 'flex',
  justifyContent: 'center'
};

export const fitParent: CSSObject = {
  width: '100%',
  height: '100%'
};

export const fadeInOut = {
  transition: { duration: 0.38 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scrollbar = {
  '&::-webkit-scrollbar': {
    width: 10,
    backgroundColor: darkBlue1,
    borderRadius: 8
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: primaryGrey,
    borderRadius: 8,
    margin: 2
  }
};

export const full = {
  width: '100%',
  height: '100%'
};
