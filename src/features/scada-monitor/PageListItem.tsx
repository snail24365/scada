import { primaryBlue } from '@/assets/color';
import { FaBeer } from 'react-icons/fa';

const PageListItem = ({ isSelected, title }: { isSelected?: boolean; title: string }) => {
  const backgroundColor = isSelected ? primaryBlue : 'transparent';
  return (
    <li style={{ backgroundColor }}>
      <FaBeer />
      {title}
      <span style={{ color: 'red' }}>red dot</span>
    </li>
  );
};

export default PageListItem;
