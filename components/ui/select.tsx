'use client'
import { ChangeEvent, useState } from "react";
import { Input } from "./input";

interface SelectProps {
    onSelectChange: (option: string) => void
}

export default function SelectComponent({onSelectChange}:SelectProps) {
  const [searchOption, setSearchOption] = useState('name');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = e.target.value;
    setSearchOption(selectedOption);
    onSelectChange(selectedOption); 
  }


  return (
    <div className="grid grid-cols-1 w-48">
    <label htmlFor="searchOption">Search By:</label>
    <select
      className="py-2"
      id="searchOption"
      value={searchOption}
      onChange={handleChange}
    >
      <option value="name">Name</option>
      <option value="cookingTime">Cooking Time</option>
    </select>
  </div>
  )
}
