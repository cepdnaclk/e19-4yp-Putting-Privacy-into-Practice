import { useEffect, useState } from "react";

export default function useAnimatedCount(target, speed = 20) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;
    if (count < target) {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev < target) return prev + 1;
          clearInterval(interval);
          return target;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [target, count, speed]);

  return count;
}
