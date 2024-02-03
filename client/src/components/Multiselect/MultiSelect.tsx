import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { useState, useRef, useEffect, useId, KeyboardEvent } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './MultiSelect.module.css';

type MultiSelectProps = {
  options: Option[];
  value: Option[];
  placeholder: string;
  //onChange: React.Dispatch<React.SetStateAction<Option[]>>;
  onChange: (value: Option[]) => void;
};

const MultiSelect = ({
  options,
  value,
  placeholder,
  onChange,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const id = useId();

  useOutsideClick(containerRef, () => setOpen(false));

  useEffect(() => {
    if (open) setHighlighted(0);
  }, [open]);

  const selectOption = (option: Option) => {
    if (!value.includes(option)) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((o) => o !== option));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      switch (e.key) {
        case 'Up':
        case 'ArrowUp':
        case 'Down':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          setOpen(true);
          break;
        default:
          break;
      }
    }

    if (open) {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
        case 'Tab':
          setOpen(false);
          break;
        case 'ArrowUp': {
          e.preventDefault();
          const next =
            highlighted - 1 < 0 ? options.length - 1 : highlighted - 1;
          setHighlighted(next);
          if (listboxRef.current !== null) {
            const child = listboxRef.current.children[next];
            child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          const prev = highlighted === options.length - 1 ? 0 : highlighted + 1;
          setHighlighted(prev);
          if (listboxRef.current !== null) {
            const child = listboxRef.current.children[prev];
            child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          break;
        }
        case ' ':
        case 'SpaceBar':
        case 'Enter':
          e.preventDefault();
          selectOption(options[highlighted]);
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.value}
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
        role="combobox"
        tabIndex={0}
        aria-label="select"
        onKeyDown={handleKeyDown}
        onClick={() => setOpen((prev) => !prev)}
      >
        {placeholder}
        {value.length > 0 && `(${value.length})`}
      </div>

      <button
        aria-label="clear"
        className={styles.button}
        type="button"
        onClick={() => {
          onChange([]);
          setOpen(false);
        }}
      >
        <AiOutlineClose className={styles.icon} />
      </button>
      <button
        aria-label="open"
        className={styles.button}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <IoIosArrowDown
          className={styles.icon}
          style={open && { transform: 'rotate(180deg)' }}
        />
      </button>

      <ul
        className={`${styles.options} ${open && styles.show}`}
        role="listbox"
        id={`${id}-options`}
        tabIndex={-1}
        aria-label="options"
        aria-activedescendant={String(highlighted)}
        aria-multiselectable="true"
        ref={listboxRef}
      >
        {options.map((option) => (
          <li
            role="option"
            aria-selected={option.id === highlighted}
            key={option.id}
            onClick={() => selectOption(option)}
            onKeyDown={() => selectOption(option)}
            onMouseEnter={() => setHighlighted(option.id)}
            className={`${styles.option} ${
              highlighted === option.id && styles.highlighted
            }`}
            value={option.name}
          >
            <input
              className={styles.checkbox}
              checked={value.includes(option)}
              type="checkbox"
              onChange={() => selectOption(option)}
              style={{ cursor: 'pointer' }}
            />
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
