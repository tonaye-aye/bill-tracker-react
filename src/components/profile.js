import React, { useState, useEffect } from "react";
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
  Text,
  TextInput,
  Heading
} from "grommet";

const Profile = ({ setAuth, setUserData }) => {
  // states
  const [usernameField, setUsernameField] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [usernameField]);

  // submit change username
  const handleChange = (e) => {
    console.log("in");
    e.preventDefault();

    userbase
      .updateUser({
        username: usernameField
      })
      .then(() => {
        // user account updated
        setUserData(usernameField);
      })
      .catch((e) => {
        console.error(e);
        if (
          e.toString() === "UsernameAlreadyExists: Username already exists."
        ) {
          setError("New username is taken");
        }
      });
  };

  // submit delete account
  const handleDelete = () => {
    userbase
      .deleteUser()
      .then(() => {
        // user marked for deletion
        setAuth(false);
      })
      .catch((e) => console.error(e));
  };

  return (
    <Box width="medium">
        <Box margin={{top: "medium"}}>
          <Form onSubmit={handleChange}>
            <Card background="light-1">
              <CardBody pad="small">
                <FormField
                  name="name"
                  htmlfor="textinput-id"
                  label="Enter new username"
                >
                  <TextInput
                    value={usernameField}
                    onChange={(e) => setUsernameField(e.target.value)}
                    id="textinput-id"
                    name="name"
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
                <Button type="submit" size="small" primary label="Update" />
              </CardFooter>
            </Card>
          </Form>
        </Box>
        <Box margin={{top: "medium"}}>
          <Form onSubmit={handleDelete}>
            <Card background="light-1" fill="true">
              <CardHeader pad="medium" color="primary">
                <Heading level={4} margin="none" responsive={true}>
                  Delete account
                </Heading>
              </CardHeader>
              <CardFooter
                pad={{ vertical: "medium", horizontal: "medium" }}
                background="light-2"
                alignItems="start"
              >
                <Button
                  type="submit"
                  size="small"
                  color="status-critical"
                  primary
                  label="Delete"
                />
              </CardFooter>
            </Card>
          </Form>
        </Box>
    </Box>
  );
};

export default Profile;
