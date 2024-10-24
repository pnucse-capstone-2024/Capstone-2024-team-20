import { useState } from 'react';
import styles from '../styles/Dropdown.module.css';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown({
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.selected}
      >
        {selectedOption || '선택하기'}
      </button>
      {isOpen && (
        <ul className={styles.optionContainer}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => handleSelectOption(option)}
                className={styles.option}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
