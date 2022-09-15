import { IconButton } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../../libs/fetcher";

const DeleteTask = ({ projectId, taskId, refetch }) => {
  const { mutate: deleteTask, isLoading: delLoading } = useMutation(
    ["deleteTask"],
    (data) => fetcher.delete(`projects/tasks/${projectId}`, { data }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const onDelete = () => {
    deleteTask({ taskId });
  };
  return (
    <IconButton
      size="sm"
      icon={<BsTrash />}
      colorScheme="red"
      aria-label="delete"
      onClick={onDelete}
      isLoading={delLoading}
    />
  );
};

export default DeleteTask;
