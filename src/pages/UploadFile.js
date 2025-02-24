import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Stack,
} from "@mui/material";

const UploadFile = () => {
  const handleFileChange = (event) => {
    // Handle file change logic here
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);
  };

  return (
    <Grid container spacing={0} alignItems="center" justifyContent="center">
      <Grid item lg={6} md={8} xs={12}>
        <div>
          <Card
            variant="outlined"
            sx={{
              p: 0,
            }}
          >
            <Box
              sx={{
                padding: "15px 30px",
              }}
              display="flex"
              alignItems="center"
            >
              <Box flexGrow={1}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  Upload File
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent
              sx={{
                padding: "30px",
              }}
            >
              <form>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiTextField-root": { mb: 2, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="File Description"
                    type="text"
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      margin={1}
                    >
                      <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileChange}
                        id="file-input"
                      />
                    </Stack>
                  </Stack>
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  margin={1}
                >
                  <Button color="primary" variant="contained">
                    Submit
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default UploadFile;
