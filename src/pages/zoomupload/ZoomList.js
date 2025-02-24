import { useEffect, useState } from "react";
import { tabledata } from "./tabledata";
import GetAppIcon from "@mui/icons-material/GetApp";
import {
  Button,
  Stack,
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ZoomList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      toast.warn("Please login first");
    }
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const tableHeadings = [
    "File name",
    "Folder name",
    "Upload Date",
    "Upload Time",
    "Status",
  ];

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          sx={{ width: 300 }}
          id="outlined-basic"
          label="Search in table"
          variant="outlined"
        />
        <Stack direction="row" spacing={2}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<GetAppIcon />}
          >
            Export
          </Button>
          <Button component={NavLink} to={"/uploadfile"} variant="contained">
            Upload
          </Button>
        </Stack>
      </Stack>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">Zoom Upload Records</Typography>
            <Box
              sx={{
                overflow: {
                  xs: "auto",
                  sm: "unset",
                },
              }}
            >
              <Table
                aria-label="simple table"
                sx={{
                  mt: 3,
                  whiteSpace: "nowrap",
                }}
              >
                <TableHead>
                  <TableRow>
                    {tableHeadings.map((heading, index) => (
                      <TableCell key={index}>
                        <Typography color="textSecondary" variant="h6">
                          {heading}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tabledata
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: "600",
                                }}
                              >
                                {product.fileName}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {product.folderName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            {product.uploadDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            {product.uploadTime}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            sx={{
                              pl: "4px",
                              pr: "4px",
                              backgroundColor:
                                product.status === "Success"
                                  ? "#2196F3"
                                  : "#CC0033",
                              color: "#fff",
                            }}
                            size="small"
                            label={product.status}
                          ></Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ZoomList;
