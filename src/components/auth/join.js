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
  Layer,
  Text,
  TextInput
} from "grommet";

const Join = ({ setAuth, setUserData }) => {
  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState();

  // fires this function everytime 'username' or 'password' states are changed
  useEffect(() => {
    setError("");
  }, [username, password]);

  // submit
  const handleJoin = (e) => {
    e.preventDefault();

    userbase
      .signUp({ username, password, rememberMe: "none" })
      .then((user) => {
        setAuth(true);
        setUserData(user.username);
      })
      .catch((e) => {
        setShow(false);
        console.log(e);
        let error = e.toString();
        error = error.substring(error.indexOf(":") + 1);
        setError(error);
      });
  };

  // reset
  const handleReset = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div>
      <Form onSubmit={handleJoin}>
        <Card background="light-1">
          <CardHeader pad="medium" color="primary">
            <Heading level={2} margin="none">
              Join
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
            <Button
              onClick={() => setShow(true)}
              type="submit"
              label="Join"
              primary
            />
            {show && (
              <Layer>
                <Heading level={3} color="primary" margin="large">
                  Loading...
                </Heading>
              </Layer>
            )}
            <Button type="reset" onClick={handleReset} label="Reset" />
          </CardFooter>
        </Card>
      </Form>
      <Box>
        <Text textAlign="center" margin={{ top: "medium" }}>
          Already a member?{" "}
          <Link to="/login">
            <Button plain color="brand" label="Log in" />
          </Link>
        </Text>
      </Box>
    </div>
  );
};

export default Join;
