import React from "react";

// grommet
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text
} from "grommet";

const Bills = () => {
  return (
    <Box margin={{ vertical: "large" }} full={true}>
      <Table>
        <TableHeader>
          <TableRow margin={{ vertical: "medium" }}>
            <TableCell scope="col">
              <Text>
                <strong>Category</strong>
              </Text>
            </TableCell>
            <TableCell scope="col">
              <Text>
                <strong>Description</strong>
              </Text>
            </TableCell>
            <TableCell scope="col" align="right">
              <Text>
                <strong>Amount</strong>
              </Text>
            </TableCell>
            <TableCell scope="col" align="right">
              <Text>
                <strong>Date (DD-Month-YYYY)</strong>
              </Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow margin={{ vertical: "medium" }}>
            <TableCell scope="col">
              <Text>Shopping</Text>
            </TableCell>
            <TableCell scope="col">
              <Text>Grocery items and clothing.</Text>
            </TableCell>
            <TableCell scope="col" align="right">
              <Text>$65.70</Text>
            </TableCell>
            <TableCell scope="col" align="right">
              <Text>02-May-2020</Text>
            </TableCell>
          </TableRow>
          <TableRow margin={{ top: "medium", bottom: "medium" }}>
            <TableCell scope="col">
              <Text>Shopping</Text>
            </TableCell>
            <TableCell scope="col">
              <Text>Grocery items and clothing.</Text>
            </TableCell>
            <TableCell scope="col" align="right">
              <Text>$65.70</Text>
            </TableCell>
            <TableCell scope="col" align="right">
              <Text>02-May-2020</Text>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default Bills;
