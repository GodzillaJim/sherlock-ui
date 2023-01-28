import { Box } from "@mui/material";
import React from "react";
import Transitions from "../../Transitions";

type TabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel = ({ children, index, value }: TabPanelProps) => {
  return (
    <Transitions in={index === value} position="top" type="collapse">
      <div
        role={"tabpanel"}
        hidden={index !== value}
        id={`custom-tabpanel-${index}`}
        aria-labelledby={`custom-tab-${index}`}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </Transitions>
  );
};

export default TabPanel;
