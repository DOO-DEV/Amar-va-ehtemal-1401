import { Box } from "@chakra-ui/react";

const MainLayout = ({ children }) => {
  return <Box minH="100vh">{children}</Box>;
};

export const getMainLayout = (page) => <MainLayout>{page}</MainLayout>;
