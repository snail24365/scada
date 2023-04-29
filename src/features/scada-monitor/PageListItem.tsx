import { darkBlue, deepDark, primaryBlue } from '@/assets/color';
import { flexCenter } from '@/style/style';
import { UUID } from '@/types/type';
import { FaBeer } from 'react-icons/fa';
import { AlarmLevel } from '../scada/scadaPageSlice';

const PageListItem = ({ title, alarmLevel, pageId }: { title: string; alarmLevel: AlarmLevel; pageId: UUID }) => {
  const isSelected = false;
  const backgroundColor = isSelected ? primaryBlue : 'transparent';
  const alarmColorMap = {
    0: 'transparent',
    1: 'green',
    2: 'gold',
    3: 'red'
  };
  return (
    <li
      css={{
        display: 'flex',
        borderRadius: 6,
        backgroundColor,
        padding: 18,
        transitionDuration: '0.4s',
        '&:hover': { cursor: 'pointer', backgroundColor: deepDark }
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
