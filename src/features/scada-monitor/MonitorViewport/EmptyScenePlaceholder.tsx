import React from 'react';

type Props = {};

const EmptyScenePlaceholder = (props: Props) => {
  return (
    <div css={{ fontSize: 20, textAlign: 'center', lineHeight: '36px' }}>
      No component in the scene.
      <br />
      Edit scada page
    </div>
  );
};

export default EmptyScenePlaceholder;
