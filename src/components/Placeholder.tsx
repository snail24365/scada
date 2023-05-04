import React from 'react';

type Props = {
  contents: React.ReactNode;
};

const Placeholder = ({ contents }: Props) => {
  return (
    <div
      css={{
        fontSize: 20,
        textAlign: 'center',
        lineHeight: '36px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {contents}
    </div>
  );
};

export default Placeholder;
