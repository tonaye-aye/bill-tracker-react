import React from "react";
import { Link } from "react-router-dom";

// images
import landingImage from "../images/wallet.svg";

// grommet
import { Box, Button, Heading, Text } from "grommet";

const Landing = ({ auth }) => {
  return (
    <div>
      <Box margin={{ bottom: "medium" }} align="center">
        <Heading level={1} margin="none" responsive={true}>
          Billtones
        </Heading>
        <Text>Keeping track of your bills.</Text>
      </Box>
      <Box margin={{ bottom: "medium" }} align="center">
        <img src={landingImage} alt="billtones" width="300" />
      </Box>
      <Box justify="center" direction="row">
        <Link to="/contact">
          <Button primary label="Contact" margin="small" />
        </Link>
        {!auth && (
          <Link to="/login">
            <Button secondary label="Login" margin="small" size="medium" />
          </Link>
        )}
      </Box>
    </div>
  );
};

export default Landing;
