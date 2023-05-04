import _ from 'lodash';
import React from 'react';

const PropertyEditFieldLayout = ({ children: input, name }: { name: string; children: React.ReactNode }) => {
  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span css={{ fontSize: 18 }}>{_.startCase(name)}</span>
      {input}
    </div>
  );
};

export default PropertyEditFieldLayout;
