import React from "react";

// grommet
import { Box } from "grommet";

const DefaultLayout = ({ children }) => {
  return (
    <Box fill align="center" justify="center">
      <Box width="medium">{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
