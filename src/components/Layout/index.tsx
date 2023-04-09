import React, { PropsWithChildren } from "react";
import { HeaderBar } from "../HeaderBar";
import { Box, Grid } from "@mui/material";

export const Layout: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => (
  <Box>
    <HeaderBar />
    {children}
  </Box>
);
