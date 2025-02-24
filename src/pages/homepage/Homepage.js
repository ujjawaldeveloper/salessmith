import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import user1 from "../../assets/images/u2.jpg";
import { activities } from "./data";

const Homepage = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(45deg, #24C9D3  30%, #3624D3  90%, #3624D3  100%)",
      }}
    >
      <Grid container spacing={0}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Card
              variant="outlined"
              sx={{
                background: "linear-gradient(60deg,#CCFBD0 60%, #99FFA1  90%)",
                
              }}
            >
              <CardContent
                sx={{
                  pb: "0 !important",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 0,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "h3.fontSize",
                        marginBottom: "0",
                      }}
                      gutterBottom
                    >
                      Lead Boost Became Easy
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      sx={{
                        fontWeight: "400",
                        fontSize: "13px",
                      }}
                    >
                      5-step Wireframe of Strategy
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginLeft: "auto",
                    }}
                  ></Box>
                </Box>
                <Timeline
                  sx={{
                    p: 0,
                  }}
                >
                  {activities.map((activity) => (
                    <TimelineItem key={activity.time}>
                      <TimelineOppositeContent
                        sx={{
                          fontSize: "12px",
                          fontWeight: "700",
                          flex: "0",
                        }}
                      >
                        {activity.time}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot
                          variant="outlined"
                          sx={{
                            borderColor: activity.color,
                          }}
                        />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        color="text.secondary"
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {activity.text}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Card
              variant="outlined"
              sx={{
                p: 0,
                width: "100%",
              }}
            >
              <img src={user1} alt="img" width="100%" />
              <CardContent
                sx={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "500",
                  }}
                >
                  Why Choose Us? Watch our explanatory video Now !
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    mt: 1,
                  }}
                >
                  Lead management software for your potential clients. Monitor
                  them, export them, send excel sheets to oneDrive so powerApps
                  can operate to provide best analysis of your Leads
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mt: "15px",
                  }}
                  color="primary"
                >
                  Watch Intro
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Homepage;
