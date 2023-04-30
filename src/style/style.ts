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
  alignItems: 'center'
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
