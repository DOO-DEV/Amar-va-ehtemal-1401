import { Box } from "@chakra-ui/react";

const ErrorMsg = ({ children, ...rest }) => {
  return (
    <Box
      color="#b2001a"
      fontWeight={600}
      mt={2}
      fontSize={["xs", "sm"]}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default ErrorMsg;
