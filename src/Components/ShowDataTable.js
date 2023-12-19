import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
  TablePagination,
} from "@mui/material";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import { useState } from "react";

const ShowDataTable = ({ data }) => {
  const { theme } = UseThemes();
  const style = {
    color: theme.color,
    fontSize: "1rem",
    textAlign: "center",
    border: `1px solid ${theme.color}`,
    background: theme.background,
    borderRadius: "20px",
  };
  const columns = [
    {
      label: "Email",
    },

    {
      label: "WPM",
    },

    {
      label: "accuracy",
    },

    {
      label: "timeStamp",
    },

    {
      label: "correctChars",
    },
    {
      label: "correctWords",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper style={{ background: theme.color, color: theme.background }}>
      <h1>Details of Previous data</h1>
      <TableContainer style={{ background: theme.color }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  style={{
                    background: theme.shadowoColor,
                    borderRight: i != columns.length - 1 ? "2px solid" : "",
                    borderColor: theme.color,
                    color: theme.background,
                    fontSize: "23px",
                    textAlign: "center",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataObj) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((obj) => {
                      let value = dataObj[obj.label];
                      if (obj.label == "timeStamp") {
                        value =
                          value.toDate().toLocaleDateString() +
                          ` ${value.toDate().toLocaleTimeString()}`;
                      }
                      return <TableCell style={style}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 3, 3, 4]}
        component="div"
        count={data.length}
        rowsPerPage={3}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ background: theme.color }}

      />
    </Paper>
  );
};
export default ShowDataTable;
