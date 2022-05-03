import { useEffect, useState } from "react";

const checkForValueInStorage = (key, defaultValue) => {
  const valueFromStorage = JSON.parse(localStorage.getItem(key));
  return valueFromStorage ? valueFromStorage : defaultValue;
};

const useLocalStorage = (key, defaultValue = "") => {
  const [value, setValue] = useState(() => {
    return checkForValueInStorage(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
