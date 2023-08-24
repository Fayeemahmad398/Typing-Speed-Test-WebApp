import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";

const ShowDataTable = ({ data, graphData }) => {
  const { theme } = UseThemes();
  const style = {
    color: theme.color,
    fontSize: "1rem",
    textAlign: "center",
    border: `1px solid ${theme.color}`,
  };

  console.log(data);
  return (
    <div className="table">
      <h2 className="details-progress">Details of Progress</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={style} className="table-cell">
                WPM
              </TableCell>
              <TableCell style={style} className="table-cell">
                Accuracy
              </TableCell>
              <TableCell style={style} className="table-cell">
                Characters
              </TableCell>
              <TableCell style={style} className="table-cell">
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((obj) => {
              return (
                <TableRow>
                  <TableCell style={style} className="table-cell">
                    {obj.WPM}
                  </TableCell>
                  <TableCell style={style} className="table-cell">
                    {obj.accuracy}
                  </TableCell>
                  <TableCell style={style} className="table-cell">
                    {obj.correctChars}/{obj.missedChars}/{obj.IncorrectChars}
                  </TableCell>
                  <TableCell style={style} className="table-cell">
                    {obj.timeStamp.toDate().toLocaleDateString() + " : "}
                    {obj.timeStamp.toDate().toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ShowDataTable;
