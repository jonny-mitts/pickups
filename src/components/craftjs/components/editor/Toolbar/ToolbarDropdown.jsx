import { FormControl, InputLabel, Select } from '@mui/material';

export const ToolbarDropdown = ({ title, value, onChange, children }) => {
  return (
    <FormControl>
      <InputLabel>{title}</InputLabel>
      <Select native value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </Select>
    </FormControl>
  );
};
