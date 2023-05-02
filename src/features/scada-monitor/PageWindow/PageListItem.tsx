import { deepDark, primaryBlue } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { flexCenter } from '@/style/style';
import { AlarmLevel, UUID } from '@/types/type';
import { FaBeer } from 'react-icons/fa';
import { selectCurrentPageId, selectScadaPages, updateCurrentPage } from '../slice/scadaPageSlice';

const PageListItem = ({ title, alarmLevel, pageId }: { title: string; alarmLevel: AlarmLevel; pageId: UUID }) => {
  const currentPageId = useAppSelector(selectCurrentPageId);
  const dispatch = useAppDispatch();

  const isSelected = currentPageId === pageId;

  const backgroundColor = isSelected ? primaryBlue : 'transparent';
  const hoverColor = isSelected ? primaryBlue : deepDark;
  const alarmColorMap = {
    0: 'transparent',
    1: 'green',
    2: 'gold',
    3: 'red'
  };

  return (
    <li
      onClick={() => dispatch(updateCurrentPage(pageId))}
      css={{
        display: 'flex',
        borderRadius: 6,
        backgroundColor,
        padding: 18,
        transitionDuration: '0.2s',
        '&:hover': { cursor: 'pointer', backgroundColor: hoverColor }
      }}
    >
      <span css={{ marginRight: 8 }}>
        <FaBeer />
      </span>
      {title}
      <div css={[flexCenter, { marginLeft: 16 }]}>
        <div css={{ width: 10, height: 10, borderRadius: 5, backgroundColor: alarmColorMap[alarmLevel] }}></div>
      </div>
    </li>
  );
};

export default PageListItem;
