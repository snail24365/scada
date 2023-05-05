import { darkBlue1, fontColor1, borderColor1 } from '@/assets/color';
import { fadeInOut, flexCenter } from '@/style/style';
import { Button, MenuItem, Paper, Select, TextField } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';
import { pageEditModalState } from './pageEditModalAtom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPage, updateScadaPage } from '../slice/scadaPageSlice';
import { AlarmLevel } from '@/types/type';

const PageEditModal = () => {
  const dispatch = useAppDispatch();
  const [pageEditModal, setPageEditModal] = useRecoilState(pageEditModalState);
  const { isOpen, pageId } = pageEditModal;

  const page = useAppSelector(selectPage(pageId));

  const [pageEditState, setPageEditState] = useState({ title: '', alarmLevel: 0 });

  useEffect(() => {
    setPageEditState({ title: page?.title ?? '', alarmLevel: page?.alarmLevel ?? 0 });
  }, [page]);

  const inputStyle = {
    '& .MuiInputBase-input': {
      color: fontColor1,
      border: `1px solid ${borderColor1}`
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...fadeInOut}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setPageEditModal((prev) => {
                return { ...prev, isOpen: false };
              });
            }
          }}
          css={{
            pointerEvents: 'all',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Paper
            elevation={3}
            sx={[
              flexCenter,
              {
                opacity: 1,
                borderRadius: 3,
                width: 500,
                minHeight: 400,
                overflow: 'hidden',
                padding: '8px 5px',
                backgroundColor: darkBlue1,
                flexDirection: 'column'
              }
            ]}
          >
            <div css={{ marginBottom: 30, fontSize: 24 }}>Page Setting</div>
            <ul>
              <li css={{ marginBottom: 20 }}>
                <div css={{ fontSize: 18, marginBottom: 8 }}>Page Title</div>
                <TextField
                  variant="filled"
                  value={pageEditState.title}
                  sx={inputStyle}
                  onChange={(e) => {
                    setPageEditState({ ...pageEditState, title: e.target.value });
                  }}
                />
              </li>
              <li css={{ marginBottom: 20 }}>
                <div css={{ fontSize: 18, marginBottom: 8 }}>Alarm Level</div>
                <Select
                  sx={[inputStyle, { '& .MuiMenuItem-root': { color: '#000 !important' } }]}
                  fullWidth={true}
                  value={pageEditState.alarmLevel}
                  onChange={(e) => {
                    setPageEditState({ ...pageEditState, alarmLevel: Number(e.target.value) as AlarmLevel });
                  }}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>Normal</MenuItem>
                  <MenuItem value={2}>Warning</MenuItem>
                  <MenuItem value={3}>Danger</MenuItem>
                </Select>
              </li>
            </ul>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(
                  updateScadaPage({
                    pageId,
                    title: pageEditState.title,
                    alarmLevel: pageEditState.alarmLevel as AlarmLevel
                  })
                );
                setPageEditModal((prev) => {
                  return { ...prev, isOpen: false };
                });
              }}
            >
              Save
            </Button>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal-layer') as HTMLElement
  );
};

export default PageEditModal;
