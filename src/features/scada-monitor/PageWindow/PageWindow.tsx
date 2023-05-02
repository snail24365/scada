import { darkBlue, darkBlueGrey1, greyBorder2 } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { flexVerticalCenter } from '@/style/style';
import { motion } from 'framer-motion';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { addScadaPage, deleteScadaPage, selectCurrentPageId, selectScadaPages } from '../slice/scadaPageSlice';
import PageList from './PageList';
type Props = {};

const PageWindow = (props: Props) => {
  const pages = useAppSelector(selectScadaPages);
  const currentPageId = useAppSelector(selectCurrentPageId);
  const dispatch = useAppDispatch();
  const numPage = pages.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        backgroundColor: darkBlue,
        border: `3px solid ${greyBorder2}`,
        marginRight: '10px',
        padding: '20px 10px',
        borderRadius: 6
      }}
    >
      <div css={[flexVerticalCenter, { justifyContent: 'space-between', marginBottom: 20, minWidth: 300 }]}>
        <div>
          <span css={{ fontSize: 18, fontWeight: 600 }}>Pages List</span>
          <span css={{ marginLeft: 10, color: 'grey' }}>{`(${numPage})`}</span>
        </div>
        <div css={{ display: 'flex', gap: 2 }}>
          <PageEditButton
            onClick={() => {
              dispatch(addScadaPage({ pageId: uuid(), title: 'Empty', alarmLevel: 0 }));
            }}
          >
            +
          </PageEditButton>
          <PageEditButton
            onClick={() => {
              console.log(currentPageId);
              if (!currentPageId) return;
              dispatch(deleteScadaPage(currentPageId));
            }}
          >
            -
          </PageEditButton>
        </div>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <PageList />
      </React.Suspense>
    </motion.div>
  );
};

const PageEditButton = ({ children, onClick }: React.PropsWithChildren<{ onClick?: React.MouseEventHandler }>) => {
  return (
    <div
      onClick={onClick}
      css={[
        {
          padding: '16px 8px',
          cursor: 'pointer',
          fontWeight: 600,
          borderRadius: 3,
          '&:hover': { backgroundColor: darkBlueGrey1 }
        }
      ]}
    >
      {children}
    </div>
  );
};

export default PageWindow;
