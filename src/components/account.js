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
  Layer,
  Text,
  TextInput,
  Heading
} from "grommet";

const Account = ({ userData, setUserData, setAuth }) => {
  // states
  const [usernameField, setUsernameField] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState();

  useEffect(() => {
    setError("");
  }, [usernameField]);

  // submit change username
  const updateUsername = (e) => {
    console.log("in");
    e.preventDefault();

    userbase
      .updateUser({
        username: usernameField
      })
      .then(() => {
        // user account updated
        setShow(false);
        setUserData(usernameField);
      })
      .catch((e) => {
        console.log(e);
        let error = e.toString();
        error = error.substring(error.indexOf(":") + 1);
        setError(error);
      });
  };

  // submit delete account
  const handleDelete = () => {
    userbase
      .deleteUser()
      .then(() => {
        // user marked for deletion
        setAuth(false);
        setShow(false);
      })
      .catch((e) => {
        setShow(false);
        console.error(e);
      });
  };

  return (
    <div>
      <Box margin={{ bottom: "medium" }}>
        <Form onSubmit={updateUsername}>
          <Card background="light-1">
            <CardHeader pad="medium" color="primary">
              <Heading
                level={2}
                margin="none"
                responsive={true}
                style={{ textTransform: "capitalize" }}
              >
                {userData.toLowerCase()}'s account
              </Heading>
            </CardHeader>
            <CardBody pad="medium">
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
              <Button
                onClick={() => setShow(true)}
                type="submit"
                size="small"
                primary
                label="Update"
              />
            </CardFooter>
          </Card>
        </Form>
      </Box>
      <Form onSubmit={handleDelete}>
        <Card background="light-1">
          <CardHeader pad="medium" color="primary">
            <Heading level={4} margin="none" responsive={true}>
              Delete your account
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
              onClick={() => setShow(true)}
            />
            {show && (
              <Layer
                onEsc={() => setShow(false)}
                onClickOutside={() => setShow(false)}
              >
                <Heading level={3} color="primary" margin="large">
                  Loading...
                </Heading>
              </Layer>
            )}
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default Account;
