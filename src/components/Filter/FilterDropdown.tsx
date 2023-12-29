import { MenuItem, Select } from '@mui/material';
import React from 'react';

const FilterDropdown = ({
  items,
  styles,
  handleSelect,
  selectedValue,
}: any) => {
  return (
    <Select
      defaultValue={items && items.length > 0 && items[0]}
      labelId="demo-simple-select-outlined-label"
      label=""
      value={selectedValue}
      onChange={handleSelect}
      sx={styles}
    >
      {items.map((item: any) => (
        <MenuItem value={item}>{item.name}</MenuItem>
      ))}
    </Select>
  );
};

export default FilterDropdown;
