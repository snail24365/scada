import { useLoader } from '@react-three/fiber';
import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type Props = {};

const FactoryModel = (props: Props) => {
  const gltf = useLoader(GLTFLoader, '/model/watertank.glb', undefined, (loader) => {});

  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
};

export default FactoryModel;
