import { Dispatch, SetStateAction, useEffect, useState } from "react";

function getStorageValue(key: string, defaultValue: string) {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(key);
    const initial = saved !== null ? saved : defaultValue;
    return initial;
  }

  return null;
}

export const useSessionStorage = (
  key: string,
  defaultValue: string
): [string | null, Dispatch<SetStateAction<string | null>>] => {
  const [value, setValue] = useState<string | null>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    sessionStorage.setItem(key, value ?? "");
  }, [key, value]);

  return [value, setValue];
};
