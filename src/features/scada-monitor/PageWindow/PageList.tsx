import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState } from '../../scada/atom/scadaAtom';
import PageListItem from './PageListItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchScadaPages, selectScadaPages } from '../slice/scadaPageSlice';

type Props = {};

const PageList = ({}: Props) => {
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
