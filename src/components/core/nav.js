import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const handleLogout = () => {
    userbase
      .signOut()
      .then(() => setAuth(false))
      .catch((e) => (document.getElementById("logout-error").innerText = e));
  };

  return (
    <Header pad="small" border="bottom">
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
                {
                  label: "Bills",
                  onClick: () => {
                    let path = `bills`;
                    history.push(path);
                  }
                },
                {
                  label: "Account",
                  onClick: () => {
                    let path = `account`;
                    history.push(path);
                  }
                },
                {
                  label: "Logout",
                  onClick: () => {
                    if (auth) {
                      handleLogout();
                    }
                  }
                }
              ]}
            />
          ) : (
            <Nav direction="row" align="center">
              {auth && (
                <Link to="/bills">
                  <Button default size="small" label="Bills" color="brand" />
                </Link>
              )}
              {!auth ? (
                <Link to="/join">
                  <Button label="Join" size="small" />
                </Link>
              ) : (
                <Link to="/account">
                  <Button label="Account" size="small" secondary />
                </Link>
              )}
              {!auth ? (
                <Link to="/login">
                  <Button primary size="small" label="Login" />
                </Link>
              ) : (
                <Button
                  plain
                  onClick={handleLogout}
                  size="small"
                  label="Logout"
                />
              )}
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export default Navigation;
