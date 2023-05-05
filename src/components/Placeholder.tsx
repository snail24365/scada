import { flexCenter, full } from '@/style/style';
import React from 'react';

type Props = {
  contents: React.ReactNode;
};

const Placeholder = ({ contents }: Props) => {
  return (
    <div
      css={{
        ...full,
        ...flexCenter,
        fontSize: 20,
        textAlign: 'center',
        lineHeight: '36px'
      }}
    >
      {contents}
    </div>
  );
};

export default Placeholder;
