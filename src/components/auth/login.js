import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import userbase from "userbase-js";

// grommet
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormField,
  Heading,
  Text,
  TextInput
} from "grommet";

const Login = ({ setAuth, setUserData }) => {
  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // fires this function everytime 'username' or 'password' states are changed
  useEffect(() => {
    setError("");
  }, [username, password]);

  // submit
  const handleLogin = (e) => {
    e.preventDefault();

    userbase
      .signIn({ username, password, rememberMe: "none" })
      .then((user) => {
        setAuth(true);
        setUserData(user.username);
      })
      .catch((e) => {
        console.log(e);
        if (
          e.toString() ===
          `UsernameOrPasswordMismatch: Username or password mismatch.`
        ) {
          setError("Incorrect username or password.");
        } else if (
          e.toString() === "UserPendingDeletion: User is pending deletion."
        ) {
          setError("Account has recently been deleted.");
        }
      });
  };

  // reset
  const handleReset = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form onSubmit={handleLogin}>
          <Card background="light-1">
            <CardHeader pad="medium" color="primary">
              <Heading level={2} margin="none" responsive={true}>
                Welcome back!
              </Heading>
            </CardHeader>
            <CardBody pad="medium">
              <FormField label="Name" name="name" required>
                <TextInput
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="name"
                  type="name"
                />
              </FormField>
              <FormField label="Password" name="password" required>
                <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                />
              </FormField>
              <Box pad={{ horizontal: "small" }}>
                <Text color="status-error">{error}</Text>
              </Box>
            </CardBody>
            <CardFooter
              pad={{ vertical: "medium", horizontal: "medium" }}
              background="light-2"
            >
              <Button size="large" type="submit" label="Login" primary />
              <Button
                size="large"
                type="reset"
                onClick={handleReset}
                label="Reset"
              />
            </CardFooter>
          </Card>
        </Form>
        <Text textAlign="center" margin={{ top: "medium" }}>
          Not a member?{" "}
          <Link to="/join">
            <Button plain color="brand" label="Join here" />
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
