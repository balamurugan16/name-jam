import { useEffect, useMemo, useState } from "react";
import { Text } from "react-native";

export function Timer({
  duration,
  onComplete,
}: {
  duration: number;
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  const minutes = useMemo(
    () =>
      Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0"),
    [timeLeft],
  );

  const seconds = useMemo(
    () => (timeLeft % 60).toString().padStart(2, "0"),
    [timeLeft],
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((num) => num - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: timeLeft < 10 ? "red" : "#000",
      }}
    >
      {minutes}:{seconds}
    </Text>
  );
}
