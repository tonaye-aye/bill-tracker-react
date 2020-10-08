import React, { useState, useEffect } from "react";

import userbase from "userbase-js";

// grommet
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormField,
  Grid,
  Heading,
  RangeInput,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  TextArea,
  TextInput
} from "grommet";
import { Trash } from "grommet-icons";

const Bills = ({ userData }) => {
  const [bills, setBills] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [amountValue, setAmountValue] = useState(0);
  const [descValue, setDescValue] = useState("");

  useEffect((userData) => {
    userbase
      .openDatabase({
        databaseName: `my-db`,
        changeHandler: function (items) {
          // update your application state with the database items
          setBills(items);
          console.log(items);
        }
      })
      .then(() => {
        // the database can now be used
      })
      .catch((e) => console.error(e));
  }, []);

  // addto DB
  const addtoDB = () => {
    //const regex = new RegExp(amountValue, "^[0-9]*$");
    setTitleValue("");
    setAmountValue(0);
    setDescValue("");
    userbase
      .insertItem({
        databaseName: `my-db`,
        item: {
          title: `${titleValue}`,
          amount: `${amountValue}`,
          description: `${descValue}`
        }
      })
      .then(() => {
        // item inserted
      })
      .catch((e) => console.error(e));
  };

  // delete item from db
  const deletefromDB = (e) => {
    userbase
      .deleteItem({
        databaseName: `my-db`,
        itemId: `${e.target.dataset.doc}`
      })
      .then(() => {
        // item deleted
      })
      .catch((e) => console.error(e));
  };

  // reset
  const handleReset = () => {
    setTitleValue("");
    setAmountValue(0);
    setDescValue("");
  };

  return (
    <Box width="large" margin={{ vertical: "xlarge" }}>
      <Heading
        margin="none"
        level={2}
        responsive={true}
        style={{ textTransform: "capitalize" }}
      >
        {userData}'s bills
      </Heading>
      <Box margin={{ top: "medium", bottom: "large" }}>
        <Table>
          <TableHeader>
            <TableRow margin={{ vertical: "medium" }}>
              <TableCell scope="col">
                <Text>
                  <strong>Amount</strong>
                </Text>
              </TableCell>
              <TableCell scope="col">
                <Text>
                  <strong>Title</strong>
                </Text>
              </TableCell>
              <TableCell scope="col">
                <Text>
                  <strong>Description</strong>
                </Text>
              </TableCell>
              <TableCell scope="col" align="center"></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow
                key={bill.itemId}
                margin={{ vertical: "medium" }}
                pad={{ vertical: "medium" }}
              >
                <TableCell scope="col" size="xxsmall">
                  <Text>${bill.item.amount}</Text>
                </TableCell>
                <TableCell scope="col" size="xsmall">
                  <Text>{bill.item.title}</Text>
                </TableCell>
                <TableCell scope="col">
                  <Text>{bill.item.description}</Text>
                </TableCell>
                <TableCell scope="col" align="center" size="xxsmall">
                  <Trash onClick={deletefromDB} data-doc={bill.itemId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {/* new forms */}
      <Box margin={{ top: "medium", bottom: "xlarge" }}>
        <Form onSubmit={addtoDB}>
          <Card background="light-1">
            <CardHeader pad="medium" color="primary">
              <Heading level={4} margin="none" responsive={true}>
                Add item
              </Heading>
            </CardHeader>
            <CardBody pad="medium">
              <Grid
                responsive={true}
                fill
                rows={["1fr", "flex"]}
                columns={["flex", "flex"]}
                gap="small"
                areas={[
                  { name: "left", start: [0, 0], end: [1, 0] },
                  { name: "right", start: [1, 0], end: [1, 0] },
                  { name: "bottom", start: [0, 1], end: [1, 1] }
                ]}
              >
                <Box gridArea="left">
                  <FormField label="Title" name="title">
                    <TextInput
                      size="small"
                      name="title"
                      onChange={(event) => setTitleValue(event.target.value)}
                      value={titleValue}
                    />
                  </FormField>
                </Box>
                <Box gridArea="right">
                  <FormField label="Amount" name="amount">
                    <Box
                      direction="row"
                      justify="between"
                      margin={{ vertical: "small" }}
                    >
                      <Box margin={{ horizontal: "small" }}>{amountValue}</Box>
                      <RangeInput
                        max="500"
                        size="small"
                        value={amountValue}
                        onChange={(event) => setAmountValue(event.target.value)}
                      />
                    </Box>
                  </FormField>
                </Box>
                <Box gridArea="bottom">
                  <FormField
                    label="Description"
                    name="description"
                    size="small"
                  >
                    <TextArea
                      size="small"
                      name="description"
                      onChange={(event) => setDescValue(event.target.value)}
                      value={descValue}
                    />
                  </FormField>
                </Box>
              </Grid>
            </CardBody>
            <CardFooter
              pad={{ vertical: "medium", horizontal: "medium" }}
              background="light-2"
              alignItems="start"
            >
              <Button type="reset" label="Reset" onClick={handleReset} />
              <Button type="submit" label="Add" primary />
            </CardFooter>
          </Card>
        </Form>
      </Box>
    </Box>
  );
};

export default Bills;
