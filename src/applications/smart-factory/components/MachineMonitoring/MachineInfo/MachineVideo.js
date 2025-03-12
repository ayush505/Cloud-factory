import React, { useEffect, useRef } from 'react';
import { loadPlayer } from 'rtsp-relay/browser';

export default function MachineVideo() {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const canvas = useRef(null);

  useEffect(() => {
    // if (isModalVisible) {
    if (!canvas.current) throw new Error('Ref is null');

    loadPlayer({
      url: 'ws://localhost:2001/api/stream',
      canvas: canvas.current
    });
    // }
  }, []);

  return <canvas ref={canvas} />;
}
