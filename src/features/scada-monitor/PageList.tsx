import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState } from '../scada/atom/scadaAtom';
import PageListItem from './PageListItem';
import { scadaPagesState } from './scadaMonitorAtom';

type Props = {};

const PageList = ({}: Props) => {
  const pages = useRecoilValue(scadaPagesState);

  setInitialPageIndexToFristOne();

  const listItems = pages.map((page) => <PageListItem {...page} key={page.pageId} />);
  return <ul css={{ display: 'flex', flexDirection: 'column', gap: 15, minWidth: 250 }}>{listItems}</ul>;

  function setInitialPageIndexToFristOne() {
    const setPageId = useSetRecoilState(currentScadaPageIdState);
    useEffect(() => {
      if (pages.length > 0) {
        setPageId(pages[0].pageId);
      }
      return () => {};
    }, []);
  }
};

export default PageList;
