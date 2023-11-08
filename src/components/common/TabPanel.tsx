import React, { ReactNode, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

type TabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
};
const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

type TabProps = {
  label: string;
  contents: ReactNode;
};

type TabGroupProps = {
  items: TabProps[];
};

export const TabGroup = ({ items }: TabGroupProps) => {
  const [value, setValue] = useState(0);

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        {items.map((item, index) => (
          <Tab key={index} label={item.label} />
        ))}
      </Tabs>
      {items.map((item, index) => (
        <TabPanel key={index} index={index} value={value}>
          {item.contents}
        </TabPanel>
      ))}
    </div>
  );
};

export default TabPanel;
