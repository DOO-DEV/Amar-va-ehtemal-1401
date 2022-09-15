import { Tr, Td, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import AddComment from "./AddComment";
import { getPriorityColor } from "../../libs/lib";

const TaskRow = ({ t, refetch, projectId, idx, listLength }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Tr
      key={t.id}
      borderBottom={idx === listLength - 1 ? "none" : "1px solid black"}
    >
      <Td textAlign="center">{idx + 1}</Td>
      <Td textAlign="center" fontSize="sm" fontWeight={700}>
        {t.name}
      </Td>
      <Td
        textAlign="center"
        fontSize="13px"
        fontWeight={700}
        color={getPriorityColor(t.priority)}
      >
        {t.priority.toUpperCase()}
      </Td>
      <Td textAlign="center">{new Date(t.createdAt).toLocaleDateString()}</Td>
      <Td textAlign="center">
        {t.isDone ? (
          <Box fontSize="12px" fontWeight={700} color="red">
            Done
          </Box>
        ) : (
          <Box fontSize="12px" fontWeight={700} color="blue.300">
            Progress
          </Box>
        )}
      </Td>
      <Td textAlign="center" fontWeight={600} fontSize="13px">
        <IconButton
          icon={<AiOutlineComment />}
          colorScheme="yellow"
          onClick={onOpen}
        />
        <AddComment
          refetch={refetch}
          onClose={onClose}
          isOpen={isOpen}
          projectId={projectId}
          taskId={t.id}
          userComment={t.userComment}
        />
      </Td>
    </Tr>
  );
};

export default TaskRow;
