import { Box } from "@chakra-ui/react";
import Header from "./Header";
import { getMainLayout as withMainLayout } from "./MainLayout";
const PanelLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box as="main" px={6} py={4} maxWidth="container.xl" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export const getLayout = (page) =>
  withMainLayout(<PanelLayout>{page}</PanelLayout>);
