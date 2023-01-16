import { useCallback, useState } from 'react';

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};

// Hook
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => { setState(state => !state); }, []);

  return [state, toggle]
}
