import { useEffect } from 'react';

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handleOutsideClick: () => void,
) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        handleOutsideClick();
      }
    };

    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  });
};

export default useOutsideClick;
