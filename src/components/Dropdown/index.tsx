import {FormControl, FormHelperText, InputLabel, MenuItem, Select,} from "@mui/material";
import React, {useRef} from "react";
import {v4} from "uuid";

export type DropdownOption = {
    label: string;
    value: string | number;
};

type DropdownProps = {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options: DropdownOption[];
    touched?: boolean;
    error?: boolean;
    helperText?: string;
    disabled?: boolean
};

const Dropdown = ({
                      label,
                      value,
                      onChange,
                      options,
                      touched,
                      error,
                      helperText, disabled
                  }: DropdownProps) => {
    const labelRef = useRef<HTMLLabelElement>(null);
    return (
        <FormControl fullWidth error={Boolean(touched && error)} sx={{m: 1}} disabled={disabled}>
            <InputLabel ref={labelRef} id={`custom-dropdown-label-${v4()}`}>
                {label}
            </InputLabel>
            <Select
                label={label}
                labelId={
                    labelRef.current ? labelRef.current.id : "custom-dropdown-label"
                }
                id={`custom-dropdown-${v4()}`}
                size="small"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map(({label, value}) => (
                    <MenuItem key={`key-${v4()}`} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>
                {touched && error ? error : helperText || ""}
            </FormHelperText>
        </FormControl>
    );
};

export default Dropdown;
