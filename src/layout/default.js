import React from "react";

// grommet
import { Box, Heading } from "grommet";

const DefaultLayout = ({ children, title }) => {
  return (
    <Box margin={{ vertical: "large" }}>
      <Heading margin="none" responsive={true}>
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default DefaultLayout;
