import { scrollbar } from '@/style/style';
import { Button } from '@mui/material';
import React from 'react';
import { LocationInfo } from './SiteMap';
import _ from 'lodash';
import { darkBlue1, darkBlue2 } from '@/assets/color';

type Props = { locationInfos: LocationInfo[] };

const LocationList = ({ locationInfos }: Props) => {
  const items = locationInfos.map((item) => (
    <li
      key={item.id}
      css={{
        display: 'flex',
        padding: '12px 10px',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 16,

        '&  .address': {
          fontSize: 12,
          color: '#aaa'
        }
      }}
    >
      <div>
        <p>Glassdome {_.capitalize(item.city)} Plant</p>
        <p className="address">{item.address}</p>
      </div>
      <Button variant="contained">Digital Twin</Button>
    </li>
  ));

  return (
    <div
      css={[
        scrollbar,
        {
          position: 'absolute',
          top: 50,
          left: 25,
          backgroundColor: darkBlue2,
          borderRadius: 4,
          opacity: 0.8,
          width: 400,
          height: '100%',
          overflow: 'auto',
          '& ul > li': {
            borderBottom: '1px solid #555'
          },
          '& li:hover': {
            backgroundColor: darkBlue1,
            cursor: 'pointer'
          }
        }
      ]}
    >
      <ul>{items}</ul>
    </div>
  );
};

export default LocationList;
