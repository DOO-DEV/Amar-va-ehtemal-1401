import { Box, Center, Spinner } from "@chakra-ui/react";

const ComponentTemplate = ({ isLoading, err, children, errMsg }) => {
  return (
    <Box>
      {isLoading || err ? (
        <>
          {isLoading && (
            <Center minH={52}>
              <Spinner size="lg" />
            </Center>
          )}
          {err && <Box>{errMsg}</Box>}
        </>
      ) : (
        <>{children}</>
      )}
    </Box>
  );
};

export default ComponentTemplate;
