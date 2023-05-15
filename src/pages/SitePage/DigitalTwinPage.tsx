import { darkBlue1 } from '@/assets/color';
import { DigitalTwinContext } from '@/features/site-digitaltwin/DigitalTwinContext';
import PointMark from '@/features/site-digitaltwin/PointMark';
import StatusBadge from '@/features/site-digitaltwin/StatusBadge';
import useResizeListener from '@/hooks/useResizeListener';
import { full } from '@/style/style';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import _ from 'lodash';
import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import * as THREE from 'three';
import FactoryModel from '../../features/site-digitaltwin/FactoryModel';

type Props = {};
/**
 * Components related with digital twin should be refactored, it was partially hard coded and tightly coupled for demo purpose.
 */
const DigitalTwinPage = (props: Props) => {
  const { pathname } = useLocation();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);

  useResizeListener(canvasRef, ({ width, height }) => {
    if (!rendererRef.current) return;
    if (!cameraRef.current) return;
    rendererRef.current.setSize(width, height, true);
    cameraRef.current.aspect = width / height;
  });

  const locationName = _.capitalize(pathname.split('/')[2]);

  return (
    <motion.div
      key="digital-twin-page"
      initial={{ opacity: 0, position: 'absolute', left: '100%', top: 0 }}
      animate={{ opacity: 1, left: 0 }}
      exit={{ opacity: 0, transform: 'translate(100%)', position: 'relative' }}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
      css={{
        ...full,
        backgroundColor: '#f1f1f1',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 100
      }}
    >
      <div css={{ height: 65, backgroundColor: darkBlue1, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Link to="/site" state={{ prevPath: pathname }}>
          <div css={{ padding: 10, cursor: 'pointer' }}>
            <BsChevronLeft css={{ color: 'white', fontSize: 24 }} strokeWidth={1} />
          </div>
        </Link>
        <span css={{ fontSize: 20, fontWeight: 600 }}>{locationName} Factory</span>
      </div>

      <DigitalTwinContext.Provider value={{ containerRef }}>
        <div css={{ ...full, position: 'relative' }} ref={containerRef}>
          <ul
            css={{
              position: 'absolute',
              left: 30,
              top: 30,
              display: 'flex',
              gap: 20,
              zIndex: 10
            }}
          >
            <StatusBadge text="Normal" subText="State" color="#0399ea" />
            <StatusBadge text="27.948" subText="Production speed(Btl/h)" color="#99cc00" />
            <StatusBadge text="47.88" subText="Pressure" color="#c34e46" />
            <StatusBadge text="49°C" subText="Temperature(°C)" color="#f39a00" />
          </ul>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <FactoryModel />
            <OrbitControls maxPolarAngle={Math.PI * 0.5} minDistance={8} maxDistance={30} />
            <PerspectiveCamera makeDefault position={[10.163539479755855, 10.373071367058202, 10.324524217575302]} />
            <PointMark />
          </Canvas>
        </div>
      </DigitalTwinContext.Provider>
    </motion.div>
  );
};

export default DigitalTwinPage;
