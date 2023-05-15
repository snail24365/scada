import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2, Vector3 } from 'three';
import { DigitalTwinContext } from './DigitalTwinContext';
import './style.css';
import { createRoot } from 'react-dom/client';
import RandomChart from './RandomChart';

type Props = {};

const PointMark = (props: Props) => {
  const { raycaster, scene, gl } = useThree();

  const { containerRef } = React.useContext(DigitalTwinContext);

  const elementsRef = React.useRef<Record<string, HTMLDivElement>>({});

  const points = {
    p1: { position: new Vector3(1.5, 3, -2.9), label: 'Tank' },
    p2: { position: new Vector3(-1, 3, -3), label: 'Tank' },
    p3: { position: new Vector3(-4, 3, -3), label: 'Tank' },
    p4: { position: new Vector3(4.5, 3, 0.5), label: 'Tank' },
    p5: { position: new Vector3(-10, 2, 4), label: 'Block' },
    p6: { position: new Vector3(10, 3, 1.5), label: 'Store' }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (const key in points) {
      const element = document.createElement('div');
      element.classList.add('point');
      const label = document.createElement('div');
      const detail = document.createElement('div');
      label.classList.add('label');
      label.innerText = points[key as keyof typeof points].label;
      detail.classList.add('detail');

      createRoot(detail).render(<RandomChart />);

      element.appendChild(label);
      element.appendChild(detail);

      elementsRef.current[key] = element;
      container.appendChild(element);
    }
    return () => {
      for (const key in points) {
        container.removeChild(elementsRef.current[key]);
      }
    };
  }, []);

  useFrame(({ camera }) => {
    for (const key in points) {
      const element = elementsRef.current[key];

      const point = points[key as keyof typeof points];
      const screenPosition = point.position.clone();
      screenPosition.project(camera);

      raycaster.setFromCamera(new Vector2(screenPosition.x, screenPosition.y), camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length === 0) {
        element.classList.remove('visible');
      } else {
        const intersectionDistance = intersects[0].distance;
        const pointDistance = point.position.distanceTo(camera.position);
        if (intersectionDistance > pointDistance) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      }

      const { width, height } = gl.domElement.getBoundingClientRect();

      element.style.left = `${screenPosition.x * width * 0.5 + width * 0.5}px`;
      element.style.top = `${-screenPosition.y * height * 0.5 + height * 0.5}px`;

      const detail = element.querySelector('.detail') as HTMLDivElement;
      detail.style.removeProperty('left');

      detail.style.left = '-120px';
      detail.style.top = '30px';
      const { left, bottom, top, width: detailWidth, height: detailHeight } = detail.getBoundingClientRect();
      if (left + detailWidth > width) {
        detail.style.left = `${-detailWidth}px`;
      }
      if (top + detailHeight > height) {
        detail.style.top = `${-detailHeight - 50}px`;
      }
    }
  });

  return <></>;
};

export default PointMark;
