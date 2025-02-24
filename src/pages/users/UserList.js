import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import GetAppIcon from "@mui/icons-material/GetApp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../Context";
import * as XLSX from "xlsx";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(2);
  return `${day}-${month}-${year}`;
};

const UserList = () => {
  const { userData, setTrigger, trigger } = useAppContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRowClick = (e) => {
    navigate(`/edituser/${e}`);
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const confirm = window.confirm("Are you sure to delete ?");
      if (!token || !confirm) {
        console.error("Token not found in localStorage");
        return;
      }
      const res = await axios.delete(`/v1/user/${id}`, {
        params: { id },
        headers: { token },
      });
      console.log(res.data);
      toast.success("User deleted successfully");
      navigate("/users");
      setTrigger(trigger + 1);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting user");
    }
  };
  const tableHeadings = [
    "Name",
    "Email",
    "Customer",
    "Created On",
    "Modified On",
    "Status",
    "Modify",
    "Action",
  ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      toast.warn("Please login first");
    }
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTrigger(trigger + 1);
    }
  }, []);
  useEffect(() => {
    if (userData.length > 0) {
      setIsLoading(false);
    }
  }, [userData]);

  const filteredUserData = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleExport = () => {
    const confirm = window.confirm("Want to export this data to Excel Sheet?");
    console.log("filteredUserData:", filteredUserData);
    const ws = XLSX.utils.json_to_sheet(filteredUserData);
    console.log("Worksheet:", ws);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserData");
    console.log("Workbook:", wb);
    if (confirm) {
      XLSX.writeFile(wb, "dataUser.xlsx");
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          label="Search by name"
          variant="outlined"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Stack direction="row" spacing={2}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<GetAppIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button component={NavLink} to={"/createuser"} variant="contained">
            New User
          </Button>
        </Stack>
      </Stack>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">User Data Panel</Typography>
            <Box
              sx={{
                overflow: {
                  xs: "auto",
                  sm: "auto",
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
                  {filteredUserData
                    .slice(0)
                    .reverse()
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((data) => (
                      <TableRow key={data.id}>
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
                                {data.name}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {data.profession}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {data.email}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            sx={{
                              pl: "4px",
                              pr: "4px",
                              backgroundColor: data.isCustomer
                                ? "#2196F3"
                                : "#CC0033",
                              color: "#fff",
                            }}
                            size="small"
                            label={data.isCustomer ? "Yes" : "No"}
                          ></Chip>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            {formatDate(data.createdOn)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            {formatDate(data.createdOn) ===
                            formatDate(data.modifiedOn)
                              ? "Not Modified"
                              : formatDate(data.modifiedOn)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            {data.status ? "Active" : "Inactive"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => handleRowClick(data._id)}
                            variant="text"
                            startIcon={<ModeEditIcon />}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleDelete(data._id)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userData.length}
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

export default UserList;
