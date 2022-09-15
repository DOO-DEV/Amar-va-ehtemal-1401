import { Box } from "@chakra-ui/react";

const AppBrand = () => {
  return (
    <Box
      fontSize="1.6rem"
      fontWeight={700}
      fontStyle="italic"
      sx={{
        "&:first-letter": {
          color: "darkGray",
        },
      }}
      textDecor="underline"
      textAlign="center"
    >
      Tracker
    </Box>
  );
};

export default AppBrand;
