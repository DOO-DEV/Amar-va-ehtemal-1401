import {
  Box,
  Table,
  Thead,
  Th,
  Td,
  Tbody,
  Tr,
  Center,
  Spinner,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { checkToken } from "../../libs/utils";
import { getLayout } from "../../components/layout/PanelLayout";
import { fetcher } from "../../libs/fetcher";
import { useUsers } from "../../libs/hooks";
import Link from "next/link";
import ComponentTemplate from "../../components/common/ComponentTemplate";

const AdminPage = () => {
  const { users, isLoading, err } = useUsers();
  return (
    <ComponentTemplate
      isLoading={isLoading}
      err={!!err}
      errMsg="You hasnt any client"
    >
      <Alert mb={3} px={3} py={3} status="info" rounded={12}>
        <AlertIcon />
        <Box fontSize="sm" fontWeight={600}>
          This list is all of our clients.
        </Box>
      </Alert>
      <Alert mb={3} px={3} py={3} status="info" rounded={12}>
        <AlertIcon />
        <Box fontSize="sm" fontWeight={600}>
          For see each client projects click on
          <Box
            px={2}
            py={2}
            bg="teal"
            display="inline"
            rounded={12}
            color="white"
            mx={3}
          >
            Details
          </Box>
          button
        </Box>
      </Alert>

      <Box overflowX="auto">
        <Table variant="unstyled">
          <Thead borderBottom="1px solid black">
            <Tr>
              <Th textAlign="center">#</Th>
              <Th textAlign="center">User naem</Th>
              <Th textAlign="center">User email</Th>
              <Th textAlign="center">Projects</Th>
              <Th textAlign="center">View details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((item, idx) => (
              <Tr
                key={item.email}
                borderBottom={
                  idx === users.length - 1 ? "none" : "1px solid black"
                }
              >
                <Td textAlign="center">{idx + 1}</Td>
                <Td textAlign="center">{item.name}</Td>
                <Td textAlign="center">{item.email}</Td>
                <Td textAlign="center">tedad</Td>
                <Td textAlign="center">
                  <Link href={`admin/projects/${item.userId}`}>
                    <Button colorScheme="teal">Details</Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ComponentTemplate>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { isAdmin } = checkToken(req);
  if (!isAdmin) {
    return {
      notFound: true,
    };
  }
  return { props: {} };
};
AdminPage.getLayout = getLayout;
export default AdminPage;
