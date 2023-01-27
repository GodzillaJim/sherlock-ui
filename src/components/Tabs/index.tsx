import React from "react";
import { Tab, TabProps, Typography } from "@mui/material";

const getProps = (index: number) => {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
};

export type CustomTabProps = TabProps & {
  index: number;
  icon: React.ReactElement;
  value: number;
  label: string;
};
export const CustomTab = ({ index, icon, value, label }: CustomTabProps) => {
  return (
    <Tab
      icon={icon}
      iconPosition="start"
      tabIndex={index}
      label={
        <Typography
          variant="caption"
          color={(theme) =>
            index === value
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        >
          {label}
        </Typography>
      }
      {...getProps(index)}
      sx={{ minHeight: "auto" }}
    />
  );
};
