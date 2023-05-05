import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { fetchScadaPages, selectScadaPages } from '../slice/scadaPageSlice';
import PageListItem from './PageListItem';

const PageList = () => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector(selectScadaPages);

  useEffect(() => {
    dispatch(fetchScadaPages());
  }, []);

  useEffect(() => {
    dispatch(fetchScadaPages());
  }, []);

  if (pages.length === 0)
    return (
      <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>No pages</div>
    );

  return (
    <ul css={{ display: 'flex', flexDirection: 'column', gap: 15, minWidth: 250 }}>
      {pages.map((page) => (
        <PageListItem {...page} key={page.pageId} />
      ))}
    </ul>
  );
};

export default PageList;
