import { darkBlue, deepDark, primaryBlue } from '@/assets/color';
import { flexCenter } from '@/style/style';
import { AlarmLevel, UUID } from '@/types/type';
import { FaBeer } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { currentScadaPageIdState } from '../scada/atom/scadaAtom';

const PageListItem = ({ title, alarmLevel, pageId }: { title: string; alarmLevel: AlarmLevel; pageId: UUID }) => {
  const [currentPageId, setCurrentPageId] = useRecoilState(currentScadaPageIdState);
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
      onClick={() => setCurrentPageId(pageId)}
      css={{
        display: 'flex',
        borderRadius: 6,
        backgroundColor,
        padding: 18,
        transitionDuration: '0.4s',
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
