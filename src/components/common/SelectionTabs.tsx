import React from "react";
import { DropdownOption } from "../Dropdown";
import { Button, Grid, styled, Typography } from "@mui/material";

const StyledButton = styled(Button)<{ selected: boolean }>(
  ({ theme, selected }) => `
    width: 120px;
    height: 75px;
    text-transform: capitalize;
    background: ${
      selected ? theme.palette.primary.dark : theme.palette.primary.light
    };
    color: ${theme.palette.getContrastText(
      selected ? theme.palette.primary.dark : theme.palette.primary.light
    )}
`
);

type SelectionTabsProps = {
  value?: DropdownOption;
  options: DropdownOption[];
  onChange: (value: DropdownOption) => void;
  label: string;
};
const SelectionTabs = ({
  value,
  options,
  label,
  onChange,
}: SelectionTabsProps) => {
  const handleChange = (option: DropdownOption) => {
    onChange(option);
  };
  return (
    <Grid container gap={2} flexDirection={"column"}>
      <Grid item>
        <Typography variant={"body2"}>{label}</Typography>
      </Grid>
      <Grid item>
        <Grid container gap={2}>
          {options.map((option) => (
            <Grid item key={option.value}>
              <StyledButton
                selected={value?.value === option.value}
                onClick={() => handleChange(option)}
              >
                {option.label}
              </StyledButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectionTabs;
