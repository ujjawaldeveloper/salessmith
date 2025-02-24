import { useEffect, useState } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
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
  TablePagination,
  Chip,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";
import * as XLSX from "xlsx";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(2);
  return `${day}-${month}-${year}`;
};

const CustomerList = () => {
  const { userData, setTrigger, trigger } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (e) => {
    navigate(`/editcustomer/${e}`);
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
      navigate("/customers");
      toast.success("Customer deleted successfully");
      setTrigger(trigger + 1);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting customer");
    }
  };

  const tableHeadings = [
    "Name",
    "Email",
    "Needs",
    "Created On",
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

  const filteredCustomerData = userData.filter(
    (user) =>
      user.isCustomer &&
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleExport = () => {
    const confirm = window.confirm("Want to export this data to Excel Sheet?");
    console.log("filteredCustomerData:", filteredCustomerData);
    const ws = XLSX.utils.json_to_sheet(filteredCustomerData);
    console.log("Worksheet:", ws);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserData");
    console.log("Workbook:", wb);
    if (confirm) {
      XLSX.writeFile(wb, "dataCustomer.xlsx");
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
          <Button
            component={NavLink}
            to={"/createcustomer"}
            variant="contained"
          >
            New Customer
          </Button>
        </Stack>
      </Stack>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">Customer Data Panel</Typography>
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
                  {filteredCustomerData
                    .slice(0)
                    .reverse()
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((customer) => (
                      <TableRow key={customer.id}>
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
                                {customer.name}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {customer.profession}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {customer.email}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            sx={{
                              pl: "4px",
                              pr: "4px",
                              backgroundColor:"#808080",
                              color: "#fff",
                            }}
                            size="small"
                            label={customer.description}
                          ></Chip>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            {formatDate(customer.createdOn)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            sx={{
                              pl: "4px",
                              pr: "4px",
                              backgroundColor: customer.status
                                ? "#2196F3"
                                : "#CC0033",
                              color: "#fff",
                            }}
                            size="small"
                            label={customer.status?"Active":"Inactive"}
                          ></Chip>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => handleRowClick(customer._id)}
                            variant="text"
                            startIcon={<ModeEditIcon />}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleDelete(customer._id)}
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
                count={filteredCustomerData.length}
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

export default CustomerList;
