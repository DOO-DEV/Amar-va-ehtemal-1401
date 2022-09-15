import { Box, Flex } from "@chakra-ui/react";

const MyInfo = () => {
  return (
    <Flex flexDir="column" maxW="sm" px={4} py={3} rounded={14} bg="#fef">
      <Box
        mb={2}
        textAlign="center"
        fontWeight={600}
        bg="teal.200"
        rounded={13}
        py={3}
        px={2}
      >
        Amar va ehtemal shahrivar 1401
      </Box>
      <Box
        as="p"
        fontWeight={600}
        bg="teal.200"
        rounded={13}
        py={3}
        px={2}
        mb={2}
        textAlign="center"
      >
        This project is for my summer course *Engineering Probability and
        Statistics* in univercity of Qom.
      </Box>
      <Box
        as="p"
        fontWeight={600}
        fontSize="md"
        fontStyle="italic"
        textAlign="center"
      >
        Teacher name: DR. Alireza Amiry esfarjani
      </Box>
      <Box as="p" textAlign="center" fontSize="md" fontWeight={700}>
        Author: Negin basirat
      </Box>
    </Flex>
  );
};

export default MyInfo;
