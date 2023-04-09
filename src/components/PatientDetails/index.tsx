import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type IParams = "id";
interface IUserDetails {
  name: string;
}
export const PatientDetails: React.FC = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { id: userId } = useParams<IParams>();
  const fetchData = useCallback(async (id: string) => {
    setLoading(true);
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    ).then((res) => res.json());

    setUserDetails(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData(userId ?? "");
  }, [userId]);

  return (
    <Box padding={2}>
      <Paper elevation={2}>
        <Grid container justifyContent="center" sx={{ paddingY: 4 }}>
          <Grid item xs={4}>
            {loading ? (
              <CircularProgress size={64} />
            ) : (
              // <pre>
              //   <code>{JSON.stringify(userDetails, null, 2)}</code>
              // </pre>

              <Card>
                <CardHeader
                  avatar={
                    <Avatar src="https://picsum.photos/64/200/200">
                      {(userDetails?.name ?? "")[0]}
                    </Avatar>
                  }
                  title={userDetails?.name ?? ""}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://loremflickr.com/320/240"
                  alt={userDetails?.name ?? ""}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap int
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
