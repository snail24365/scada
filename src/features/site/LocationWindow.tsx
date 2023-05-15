import { darkBlue1, darkBlue2 } from '@/assets/color';
import { useAppDispatch } from '@/store/hooks';
import { flexCenter, full, scrollbar } from '@/style/style';
import { Button, Paper } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchSites, selectSites } from './siteSlice';
import { useSetRecoilState } from 'recoil';
import { focusedLocationIdState, mapCenterState } from './atom';
import { IoEnterOutline } from 'react-icons/io5';

const LocationWindow = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSites());
  }, []);

  const locationInfos = useSelector(selectSites);
  const setFocusedLocationId = useSetRecoilState(focusedLocationIdState);

  const items = locationInfos.map((item) => (
    <li
      onClick={() => {
        setFocusedLocationId(item.id);
      }}
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
        <p>{_.capitalize(item.city)} Plant</p>
        <p className="address">{item.address}</p>
      </div>
      <IoEnterOutline style={{ fontSize: 22 }} />
    </li>
  ));

  const contents = items.length === 0 ? <div css={[full, flexCenter]}>No factory locations</div> : <ul>{items}</ul>;

  return (
    <Paper
      elevation={4}
      css={[
        scrollbar,
        {
          position: 'absolute',
          top: 50,
          left: 25,
          backgroundColor: darkBlue2,
          borderRadius: 4,
          opacity: 0.8,
          width: 340,
          height: 'calc(100% - 100px)',
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
      {contents}
    </Paper>
  );
};

export default LocationWindow;
