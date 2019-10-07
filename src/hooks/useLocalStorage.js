import { useState } from "react";

export const useLocalStorage =(key, initialValue) => {

    // Error handling: if key is not a string we will throw an error
    if (typeof key !== 'string') {
      throw new Error(
        'Invalid Params: useLocalStorage should receive a string for the first argument'
      );
    }

  // using state to set our initial value IF local storage has it
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      localStorage.setItem(key, initialValue);
      return initialValue;
    }
  });

  const saveValue = value => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  // return our variable, 
  //     and the function to properly update our variable with localStorage
  return [storedValue, saveValue];
}