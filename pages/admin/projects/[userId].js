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
import { useRouter } from "next/router";
import { MdManageAccounts } from "react-icons/md";
import { getLayout } from "../../../components/layout/PanelLayout";
import { useGetProjects } from "../../../libs/hooks";
import { checkToken } from "../../../libs/utils";
import ComponentTemplate from "../../../components/common/ComponentTemplate";
import AddProject from "../../../components/admin/AddProject";

const Projects = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { projects, isLoading, err, refetch, isFetching } =
    useGetProjects(userId);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <ComponentTemplate isLoading={isLoading} err={err} errMsg="User not found.">
      <Flex w="full" mb={4} align="center">
        <Button colorScheme="teal" size="sm" onClick={onOpen} mr={4}>
          Add project
        </Button>
        <Button
          onClick={refetch}
          colorScheme="green"
          size="sm"
          isLoading={isFetching}
        >
          Update list
        </Button>
      </Flex>
      <Box overflow="auto">
        <Table variant="unstyled">
          <Thead borderBottom="1px solid black">
            <Tr>
              <Th textAlign="center">#</Th>
              <Th textAlign="center">Title</Th>
              <Th textAlign="center">Description</Th>
              <Th textAlign="center">Created at</Th>
              <Th textAlign="center">Manage tasks</Th>
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
                  <Link href={`/admin/projects/tasks/${p.id}`}>
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
      <AddProject
        onClose={onClose}
        isOpen={isOpen}
        userId={userId}
        refetch={refetch}
      />
    </ComponentTemplate>
  );
};

export default Projects;
export const getServerSideProps = async ({ req }) => {
  const { isAdmin } = checkToken(req);
  if (!isAdmin) {
    return {
      notFound: true,
    };
  }
  return { props: {} };
};
Projects.getLayout = getLayout;
