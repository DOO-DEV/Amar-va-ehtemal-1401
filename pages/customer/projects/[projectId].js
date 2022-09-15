import { useRouter } from "next/router";
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
import { AiOutlineComment } from "react-icons/ai";
import { checkToken } from "../../../libs/utils";
import { getLayout } from "../../../components/layout/PanelLayout";
import ComponentTemplate from "../../../components/common/ComponentTemplate";
import { useGetProjects, useGetTasks } from "../../../libs/hooks";
import { getPriorityColor, sortArr } from "../../../libs/lib";
import AddComment from "../../../components/customer/AddComment";
import TaskRow from "../../../components/customer/TaskRow";

const Projects = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { tasks, isLoading, isFetching, refetch, err } = useGetTasks(projectId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ComponentTemplate isLoading={isLoading} err={err} errMsg="User not found.">
      <Box overflow="auto">
        <Table variant="unstyled">
          <Thead borderBottom="1px solid black">
            <Tr>
              <Th textAlign="center">#</Th>
              <Th textAlign="center">Title</Th>
              <Th textAlign="center">Priority</Th>
              <Th textAlign="center">Created at</Th>
              <Th textAlign="center">Task status</Th>
              <Th textAlign="center">Add comment</Th>
            </Tr>
          </Thead>
          <Tbody textAlign="center">
            {tasks?.sort(sortArr).map((t, idx) => (
              <TaskRow
                key={t.id}
                refetch={refetch}
                projectId={projectId}
                t={t}
                idx={idx}
                listLength={tasks.length}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </ComponentTemplate>
  );
};

export const getServerSideProps = ({ req }) => {
  const { isAdmin } = checkToken(req);
  if (isAdmin) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
};

Projects.getLayout = getLayout;

export default Projects;
