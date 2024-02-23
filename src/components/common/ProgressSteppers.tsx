import { ColorlibConnector, ColorlibStepIcon } from "./CustomStepLabel";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

type ProgressSteppersProps = {
  activeStep: number;
};
const ProgressSteppers = ({ activeStep }: ProgressSteppersProps) => {
  const steps = [
    "Add a title",
    "Update instructions",
    "Reserve payment",
    "Track progress",
    "Collect your paper",
  ];
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            <Typography variant={"caption"}>{label}</Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ProgressSteppers;
