import { darkBlue2 } from '@/assets/color';
import { Paper } from '@mui/material';

type Props = {
  text: string;
  subText?: string;
  color?: string;
};

const StatusBadge = ({ text, subText, color }: Props) => {
  const borderRadius = 5;
  color = color ?? '#0399ea';
  return (
    <Paper
      component={'li'}
      elevation={4}
      sx={{
        width: 310,
        display: 'flex'
      }}
    >
      <div
        css={{
          width: 8,
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
          backgroundColor: color
        }}
      ></div>
      <div
        css={{
          backgroundColor: darkBlue2,
          display: 'flex',
          opacity: 0.8,
          flexDirection: 'column',
          alignItems: 'end',
          padding: '20px',
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          flex: 1
        }}
      >
        <p css={{ fontSize: 34, color: '#fff' }}>{text}</p>
        <p css={{ fontSize: 19, color: '#a0a0a0' }}>{subText}</p>
      </div>
    </Paper>
  );
};

export default StatusBadge;
