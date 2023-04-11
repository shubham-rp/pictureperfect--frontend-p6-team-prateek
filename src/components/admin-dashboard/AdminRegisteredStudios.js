import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

import { registeredStudiosData } from "../../assets/mock-data/registeredStudiosData";
import { Button } from "@mui/material";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function AdminRegisteredStudios() {
  return (
    <TableContainer sx={{ maxHeight: "600px" }} component={Paper}>
      <Table stickyHeader sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Photo Studio Name</StyledTableCell>
            <StyledTableCell>Studio City</StyledTableCell>
            <StyledTableCell align="center">VERIFIED STUDIO</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registeredStudiosData
            .filter((item) => {
              return item.isStudioVerified === true;
            })
            .map((row, index) => (
              <StyledTableRow
                key={registeredStudiosData.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{row.studioName}</StyledTableCell>
                <StyledTableCell>{row.studioCity}</StyledTableCell>
                <StyledTableCell align="center">
                  <VerifiedTwoToneIcon style={{ color: "green" }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminRegisteredStudios;
