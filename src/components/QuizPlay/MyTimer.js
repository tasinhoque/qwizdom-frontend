import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp, expireFunc }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      expireFunc();
    },
  });

  return (
    <div style={{ fontSize: '20px', fontWeight: '500', textAlign: 'center' }}>
      <div>
        <span>{hours}</span>:<span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

// export default function App() {

//   return (
//     <div>
//       <MyTimer expiryTimestamp={time} />
//     </div>
//   );
// }
