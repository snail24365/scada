import React from 'react';
import PageListItem from './PageListItem';
import { useSelector } from 'react-redux';
import { selectPages } from '../scada/scadaPageSlice';
import { flexVerticalCenter } from '@/style/style';

type Props = {};

const PageList = ({}: Props) => {
  const pages = useSelector(selectPages);
  const listItems = pages.map((page) => {
    return <PageListItem {...page} />;
  });
  return <ul css={{ display: 'flex', flexDirection: 'column', gap: 15 }}>{listItems}</ul>;
};

export default PageList;
