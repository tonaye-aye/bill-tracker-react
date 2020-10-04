import React from "react";
import { Link } from "react-router-dom";

// userbase
import userbase from "userbase-js";

// grommet
import {
  Button,
  Box,
  Header,
  Nav,
  Menu,
  ResponsiveContext,
  Text
} from "grommet";
import { Home, Menu as MenuIcon } from "grommet-icons";

const Navigation = ({ userData, auth, setAuth }) => {
  const handleLogout = () => {
    userbase
      .signOut()
      .then(() => setAuth(false))
      .catch((e) => (document.getElementById("logout-error").innerText = e));
  };

  return (
    <Header pad="small" border="bottom" background="white">
      <Box direction="row" align="center" gap="small">
        <Link to="/">
          <Button
            icon={<Home size="small" />}
            primary
            color="accent-1"
            label="Home"
          />
        </Link>
        {auth && (
          <Text>
            Hey, <strong>{userData}!</strong>
          </Text>
        )}
      </Box>
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <Menu
              dropProps={{ align: { top: "top", right: "right" } }}
              icon={<MenuIcon color="brand" />}
              items={[
                { label: "This is", onClick: () => {} },
                { label: "The Menu", onClick: () => {} },
                { label: "Component", onClick: () => {} }
              ]}
            />
          ) : (
            <Nav direction="row" align="center">
              {auth && (
                <Link to="/bills">
                  <Button default label="Bills" color="brand" />
                </Link>
              )}
              {!auth ? (
                <Link to="/join">
                  <Button label="Join" />
                </Link>
              ) : (
                <Link to="/profile">
                  <Button label="Profile" secondary />
                </Link>
              )}
              {!auth ? (
                <Link to="/login">
                  <Button primary label="Login" />
                </Link>
              ) : (
                <Button plain onClick={handleLogout} label="Logout" />
              )}
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export default Navigation;
