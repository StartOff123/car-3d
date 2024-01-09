import React from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

function Box({ color }) {
    const box = React.useRef();
    const time = React.useRef(0);
    const [xRotSpeed] = React.useState(() => Math.random());
    const [yRotSpeed] = React.useState(() => Math.random());
    const [scale] = React.useState(() => Math.pow(Math.random(), 2) * 0.5 + 0.05);
    const [position, setPosition] = React.useState(getInitialPosition());

    function getInitialPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;

        return v;
    }

    function resetPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10);
        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;

        setPosition(v);
    }

    useFrame((_, delta) => {
        time.current += delta + 0.05;
        let newZ = position.z - (time.current);

        if (newZ < -10) {
            resetPosition();
            time.current = 0;
        }

        box.current.position.set(position.x, position.y, newZ);
        box.current.rotation.x += delta * xRotSpeed;
        box.current.rotation.y += delta * yRotSpeed;
    }, [xRotSpeed, yRotSpeed, position]);

    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} envMapIntensity={0.15} />
        </mesh>
    );
}

export function Boxes() {
    return (
        <>
            {[...Array(100)].map((_, i) => <Box key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />)}
        </>
    );
}