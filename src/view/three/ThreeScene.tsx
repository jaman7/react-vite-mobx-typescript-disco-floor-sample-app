import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  pattern: number[][][];
  currentFrame: number;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ pattern, currentFrame }) => {
  const currentPattern = useMemo(
    () => (pattern && pattern.length > 0 && currentFrame < pattern.length ? pattern[currentFrame] : null),
    [pattern, currentFrame]
  );

  const meshElements = useMemo(() => {
    if (!currentPattern) return null;
    const size = currentPattern.length;

    return currentPattern.map((row, rowIndex) =>
      row.map((value, colIndex) => {
        const height = value * 0.2;
        const geometry = new THREE.BoxGeometry(0.8, height, 0.8);
        return (
          <mesh position={[rowIndex - size / 2, height / 2, colIndex - size / 2]} key={`${rowIndex}-${colIndex}`}>
            <RoundedBox args={[0.8, height, 0.8]} radius={0.15} smoothness={4}>
              <bufferGeometry attach="geometry" {...geometry} />
              <meshStandardMaterial
                color={new THREE.Color(`hsl(${value * 50}, 100%, 80%)`)}
                transparent
                opacity={0.9}
                metalness={0.6}
                roughness={0.8}
              />
            </RoundedBox>
          </mesh>
        );
      })
    );
  }, [currentPattern]);

  return (
    <Canvas className="three-scene" camera={{ position: [5, 20, 10], fov: 30 }}>
      <ambientLight intensity={2.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {meshElements}
    </Canvas>
  );
};

export default ThreeScene;
