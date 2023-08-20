import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import { UseThemes } from "./GlobalContextFolder/MyThemeContext";

const ShowDataTable = ({ data, graphData }) => {
  const { theme } = UseThemes();
  const style = {
    color: theme.color,
    fontSize: "1.5rem",
    textAlign: "center",
    border: `1px solid ${theme.color}`,
  };

  console.log(data);
  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={style}>WPM</TableCell>
              <TableCell style={style}>Accuracy</TableCell>
              <TableCell style={style}>Characters</TableCell>
              <TableCell style={style}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((obj) => {
              return (
                <TableRow>
                  <TableCell style={style}>{obj.WPM}</TableCell>
                  <TableCell style={style}>{obj.accuracy}</TableCell>
                  <TableCell style={style}>
                    {obj.correctChars}/{obj.missedChars}/{obj.IncorrectChars}
                  </TableCell>
                  <TableCell style={style}>
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
