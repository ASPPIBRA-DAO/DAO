
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

interface TimerProps {
  initialSeconds: number;
  onExpire: () => void;
}

export const Timer: React.FC<TimerProps> = ({ initialSeconds, onExpire }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <Text style={styles.timer}>
      Código expira em: {String(minutes).padStart(2, '0')}:
      {String(seconds).padStart(2, '0')}
    </Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontWeight: '600',
    color: '#d9534f',
    marginTop: 15,
    fontSize: 14.4,
    textAlign: 'center',
  },
});
