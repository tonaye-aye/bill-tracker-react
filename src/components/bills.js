import React, { useState, useEffect } from "react";

import userbase from "userbase-js";

// grommet
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  TextInput
} from "grommet";

const Bills = ({ userData }) => {
  const [bills, setBills] = useState([]);
  const [insertValue, setInsertValue] = useState('');
  const [delValue, setDelValue] = useState('');

  useEffect((userData) => {
    console.log('use effect');
    userbase.openDatabase({
      databaseName: `${userData}`,
      changeHandler: function (items) {
        // update your application state with the database items
        setBills(items);
        console.log(items);

      }
    }).then(() => {
      // the database can now be used
    }).catch((e) => console.error(e))

  }, []);

  // addto DB
  const addtoDB = () => {
    setInsertValue('');
    setDelValue('')
    userbase.insertItem({
      databaseName: `${userData}`,
      item: { something: `${insertValue}` }
    }).then(() => {
      console.log(bills);
      // item inserted
    }).catch((e) => console.error(e))
  }

  // delete item from db
  const deletefromDB = () => {
    setInsertValue('');
    setDelValue('')
    userbase.deleteItem({
      databaseName: `${userData}`,
      itemId: `${delValue}`
    }).then(() => {
      // item deleted
    }).catch((e) => console.error(e))
  };

  return (
    <Box margin={{ vertical: "large" }} full={true}>
      <Table>
        <TableHeader>
          <TableRow margin={{ vertical: "medium" }}>
            <TableCell scope="col">
              <Text>
                <strong>Description</strong>
              </Text>
            </TableCell>
            <TableCell scope="col">
              <Text>
                <strong>ID</strong>
              </Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map(bill => (
            <TableRow key={bill.itemId} margin={{ vertical: "medium" }}>
            <TableCell scope="col">
              <Text>{bill.item.something}</Text>
            </TableCell>
            <TableCell scope="col">
              <Text>{bill.itemId}</Text>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
      <br/>
      <TextInput
      placeholder="add to db"
      value={insertValue}
      onChange={event => setInsertValue(event.target.value)}
      />
      <br/>
      <TextInput
      placeholder="delete from db"
      value={delValue}
      onChange={event => setDelValue(event.target.value)}
    />
    <br/>
      <Button size="large" onClick={addtoDB} label="Add to database" secondary />
      <br />
      <Button size="large" onClick={deletefromDB} label="Delete from database" secondary />
    </Box>
  );
};

export default Bills;
