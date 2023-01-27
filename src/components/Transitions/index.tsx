import React from "react";
import { Box, Collapse, Fade, Grow } from "@mui/material";

type TransitionsProps = {
  children: JSX.Element;
  position:
    | "top-right"
    | "top"
    | "bottom-left"
    | "bottom-right"
    | "bottom"
    | "top-left";
  type: "grow" | "fade" | "collapse";
  in: boolean;
};

const Transitions = (props: TransitionsProps) => {
  const { position, type, children } = props;
  let positionSX = {
    transformOrigin: "0 0 0",
  };

  switch (position) {
    case "top-right":
    case "top":
    case "bottom-left":
    case "bottom-right":
    case "top-left":
    default:
      positionSX = {
        transformOrigin: "0 0 0",
      };
      break;
  }

  return (
    <Box>
      {type === "grow" && (
        <Grow in={props.in}>
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}
      {type === "fade" && (
        <Fade in={props.in} timeout={{ appear: 0, enter: 300, exit: 150 }}>
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}
      {type === "collapse" && (
        <Collapse in={props.in}>
          <Box sx={positionSX}>{children}</Box>
        </Collapse>
      )}
    </Box>
  );
};

export default Transitions;
