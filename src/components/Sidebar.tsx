import { MenuItem, Stack } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { FiMonitor, FiPower } from 'react-icons/fi';
import { GiClick } from 'react-icons/gi';
import { Link } from 'react-router-dom';

type Props = {};

const SidebarButton = ({ icon }: React.PropsWithChildren<{ icon: React.ReactNode }>) => {
  return <div>{icon}</div>;
};

const Sidebar = (props: Props) => {
  return (
    <div
      css={{
        position: 'relative',
        zIndex: 100,
        flexShrink: 1,
        width: 64,
        backgroundColor: '#1b222b',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px 5px',
        '& svg': {
          fontSize: 25
        }
      }}
    >
      <Stack gap={'50px'}>
        <Stack gap={3}>
          <MenuItem component={Link} to={'/'}>
            <AiFillHome />
          </MenuItem>
        </Stack>
        <Stack gap={2}>
          <MenuItem component={Link} to={'/site'}>
            <GiClick />
          </MenuItem>
          {/* <MenuItem component={Link} to={'/scada'}>
            <FiMonitor />
          </MenuItem> */}
        </Stack>
      </Stack>
      <Stack>
        {/* <MenuItem component={Link} to={'/scada'}>
          <FiPower />
        </MenuItem> */}
      </Stack>
    </div>
  );
};

export default Sidebar;
