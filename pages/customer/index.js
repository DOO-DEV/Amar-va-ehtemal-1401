import Link from "next/link";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { MdManageAccounts } from "react-icons/md";
import { checkToken } from "../../libs/utils";
import { getLayout } from "../../components/layout/PanelLayout";
import ComponentTemplate from "../../components/common/ComponentTemplate";
import { useGetProjects } from "../../libs/hooks";

const Customer = ({ userId }) => {
  const { projects, isLoading, err, refetch, isFetching } =
    useGetProjects(userId);

  return (
    <ComponentTemplate isLoading={isLoading} err={err} errMsg="User not found.">
      <Box overflow="auto">
        <Table variant="unstyled">
          <Thead borderBottom="1px solid black">
            <Tr>
              <Th textAlign="center">#</Th>
              <Th textAlign="center">Title</Th>
              <Th textAlign="center">Description</Th>
              <Th textAlign="center">Created at</Th>
              <Th textAlign="center">Tasks</Th>
            </Tr>
          </Thead>
          <Tbody textAlign="center">
            {projects?.map((p, idx) => (
              <Tr
                key={p.id}
                borderBottom={
                  idx === projects.length - 1 ? "none" : "1px solid black"
                }
              >
                <Td textAlign="center">{idx + 1}</Td>
                <Td textAlign="center" fontSize="sm" fontWeight={700}>
                  {p.title}
                </Td>
                <Td textAlign="center" fontWeight={600} fontSize="13px">
                  {p.description}
                </Td>
                <Td textAlign="center">
                  {new Date(p.createdAt).toLocaleDateString()}
                </Td>
                <Td textAlign="center">
                  <Link href={`/customer/projects/${p.id}`}>
                    <IconButton
                      icon={<MdManageAccounts />}
                      colorScheme="orange"
                      aria-label="manage-task"
                    />
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

export const getServerSideProps = ({ req }) => {
  const { isAdmin, id } = checkToken(req);
  if (isAdmin) {
    return {
      notFound: true,
    };
  }

  return { props: { userId: id } };
};

Customer.getLayout = getLayout;
export default Customer;
