import { useState } from "react";

const NavbarDarkExample = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false);
    };
  
    return (
      <div className="dropdown">
        <button onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </button>
        {isOpen && (
          <ul>
            {options.map((option) => (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
export default NavbarDarkExample;