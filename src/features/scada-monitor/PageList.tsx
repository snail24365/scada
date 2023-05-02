import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState } from '../scada/atom/scadaAtom';
import PageListItem from './PageListItem';
import { scadaPagesState } from './scadaMonitorAtom';

type Props = {};

const PageList = ({}: Props) => {
  setFirstPageWhenMounted();
  const pages = useRecoilValue(scadaPagesState);

  return (
    <ul css={{ display: 'flex', flexDirection: 'column', gap: 15, minWidth: 250 }}>
      {pages.map((page) => (
        <PageListItem {...page} key={page.pageId} />
      ))}
    </ul>
  );

  function setFirstPageWhenMounted() {
    const setPageId = useSetRecoilState(currentScadaPageIdState);
    useEffect(() => {
      if (pages.length > 0) {
        setPageId(pages[0].pageId);
      }
    }, []);
  }
};

export default PageList;
