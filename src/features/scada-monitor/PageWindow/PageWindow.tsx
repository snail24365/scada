import { darkBlue2, darkBlue4, borderColor2 } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { flexVerticalCenter } from '@/style/style';
import { motion } from 'framer-motion';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { addScadaPage, deleteScadaPage, selectCurrentPageId, selectScadaPages } from '../slice/scadaPageSlice';
import PageList from './PageList';

const PageWindow = () => {
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
        backgroundColor: darkBlue2,
        border: `3px solid ${borderColor2}`,
        marginRight: '10px',
        padding: '20px 10px',
        borderRadius: 6
      }}
    >
      <div css={[flexVerticalCenter, { justifyContent: 'space-between', marginBottom: 20 }]}>
        <div>
          <span css={{ fontSize: 18, fontWeight: 600 }}>Pages List</span>
          <span css={{ marginLeft: 10, color: 'grey' }}>{`(${numPage})`}</span>
        </div>
        <div css={{ display: 'flex', gap: 2 }}>
          <PageEditButton
            onClick={() => {
              dispatch(addScadaPage({ pageId: uuid(), title: 'New page, double click to edit.', alarmLevel: 0 }));
            }}
          >
            +
          </PageEditButton>
          <PageEditButton
            onClick={() => {
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
          '&:hover': { backgroundColor: darkBlue4 }
        }
      ]}
    >
      {children}
    </div>
  );
};

export default PageWindow;
