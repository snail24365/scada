import React, { PropsWithChildren, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedEditMenuIndexState } from '../../atom/scadaEditSectionAtom';
import { ButtonGroupContext } from './ButtonGroupContext';

type OpenButtonProp = { isOpen?: boolean; onClick?: React.MouseEventHandler };

const ButtonGroup = <T extends OpenButtonProp>(props: { children: React.ReactElement<T>[] }) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useRecoilState(selectedEditMenuIndexState);
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      ...child.props,
      isOpen: selectedMenuIndex === index,
      onClick: (e: React.MouseEvent) => {
        if (index === selectedMenuIndex) setSelectedMenuIndex(-1);
        else setSelectedMenuIndex(index);
        child.props.onClick?.(e);
      },
    });
  });
  return <>{children}</>;
};

export default ButtonGroup;
