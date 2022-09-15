import { getMainLayout } from "../components/layout/MainLayout";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ErrorMsg from "../components/common/ErrorMsg";
import SiginForm from "../components/sigin/SiginForm";
import AppBrand from "../components/shared/AppBrand";
import Head from "next/head";
import MyInfo from "../components/shared/MyInfo";

const Sigin = () => {
  return (
    <>
      <Head>
        <title>Tracker | sigin</title>
      </Head>
      <Box
        display="flex"
        flexDir="column"
        bg="#fff"
        minH="100vh"
        height="full"
        w="full"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          p={4}
          display="flex"
          flexDir="column"
          border="1px solid #e0e0e2"
          rounded={8}
          minW="sm"
          mb={3}
        >
          <Box mb={3}>
            <AppBrand />
          </Box>
          <SiginForm />
        </Box>
        <MyInfo />
      </Box>
    </>
  );
};

export const getServerSideProps = ({ req }) => {
  const token = req.cookies.APP_TOKEN;
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: {} };
};

Sigin.getLayout = getMainLayout;
export default Sigin;
