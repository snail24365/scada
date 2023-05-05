import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedEditMenuIndexState } from '../../atom/scadaEditSectionAtom';

type OpenButton = { isOpen?: boolean; onClick?: React.MouseEventHandler };

const ButtonGroup = <T extends OpenButton>(props: { children: React.ReactElement<T>[] }) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useRecoilState(selectedEditMenuIndexState);
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      ...child.props,
      isOpen: selectedMenuIndex === index,
      onClick: (e: React.MouseEvent) => {
        if (index === selectedMenuIndex) setSelectedMenuIndex(-1);
        else setSelectedMenuIndex(index);
        child.props.onClick?.(e);
      }
    });
  });
  return <>{children}</>;
};

export default ButtonGroup;
