import { useRouter } from "next/router";
import {
  Flex,
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Link,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdManageAccounts } from "react-icons/md";
import { MdDownloadDone } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { getLayout } from "../../../../components/layout/PanelLayout";
import { useGetTasks } from "../../../../libs/hooks";
import { checkToken } from "../../../../libs/utils";
import ComponentTemplate from "../../../../components/common/ComponentTemplate";
import AddTask from "../../../../components/admin/AddTask";
import UserComment from "../../../../components/admin/UserComment";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../../../../libs/fetcher";
import DoneTask from "../../../../components/admin/DoneTask";
import DeleteTask from "../../../../components/admin/DeleteTask";
import { sortArr } from "../../../../libs/lib";

const Tasks = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { tasks, isLoading, isFetching, refetch, err } = useGetTasks(projectId);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: commentOpen,
    onClose: onCommentClose,
    onOpen: onCommentOpen,
  } = useDisclosure();

  return (
    <ComponentTemplate isLoading={isLoading} err={err} errMsg="User not found.">
      <Flex w="full" mb={4} align="center">
        <Button colorScheme="teal" size="sm" onClick={onOpen} mr={4}>
          Add task
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
              <Th textAlign="center">User comment</Th>
              <Th textAlign="center">Created at</Th>
              <Th textAlign="center">Manage tasks</Th>
            </Tr>
          </Thead>
          <Tbody textAlign="center">
            {tasks?.sort(sortArr).map((t, idx) => (
              <Tr
                key={t.id}
                borderBottom={
                  idx === tasks.length - 1 ? "none" : "1px solid black"
                }
              >
                <Td textAlign="center">{idx + 1}</Td>
                <Td textAlign="center" fontSize="sm" fontWeight={700}>
                  {t.name}
                </Td>
                <Td textAlign="center" fontWeight={600} fontSize="13px">
                  {t.userComment ? (
                    <>
                      <Button
                        onClick={onCommentOpen}
                        size="sm"
                        colorScheme="purple"
                      >
                        Read
                      </Button>
                      <UserComment
                        isOpen={commentOpen}
                        onClose={onCommentClose}
                        userComment={t.userComment}
                      />
                    </>
                  ) : (
                    "-"
                  )}
                </Td>
                <Td textAlign="center">
                  {new Date(t.createdAt).toLocaleDateString()}
                </Td>
                <Td textAlign="center">
                  {t.isDone ? (
                    <Box fontSize="12px" fontWeight={700}>
                      Task is Done
                    </Box>
                  ) : (
                    <>
                      <DoneTask
                        projectId={projectId}
                        taskId={t.id}
                        refetch={refetch}
                      />
                      <DeleteTask
                        projectId={projectId}
                        taskId={t.id}
                        refetch={refetch}
                      />
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <AddTask
        onClose={onClose}
        isOpen={isOpen}
        projectId={projectId}
        refetch={refetch}
      />
    </ComponentTemplate>
  );
};

export default Tasks;
export const getServerSideProps = async ({ req }) => {
  const { isAdmin } = checkToken(req);
  if (!isAdmin) {
    return {
      notFound: true,
    };
  }
  return { props: {} };
};
Tasks.getLayout = getLayout;
