
import Head from "next/head";
import {

  Box,

  Grid,

} from "@mui/material";

import { Layout as DashboardLayout } from "../layouts/dashboard/layout";

import AddProductPage from "src/components/AddProduct";

const Page = () => {
  return (
    <>
      <Head>
        <title>Website URL | Devias Kit</title>
      </Head>

      <Grid
        container
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Grid 
        item xs={12} 
        sx={{ flex: "1 1 auto" }}>
          <Box
            sx={{
              backgroundColor: "background.paper",
              flex: "1 1 auto",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AddProductPage />

          </Box>

        </Grid>
      </Grid>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
