import { IconButton } from "@chakra-ui/react";
import { MdDownloadDone } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../../libs/fetcher";

const DoneTask = ({ projectId, taskId, refetch }) => {
  const { mutate: markAsDone, isLoading: doneLoading } = useMutation(
    ["markAsDone"],
    (data) => fetcher.patch(`projects/tasks/${projectId}`, data),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const onDone = () => {
    markAsDone({ taskId });
  };
  return (
    <IconButton
      size="sm"
      mr={2}
      icon={<MdDownloadDone />}
      colorScheme="green"
      aria-label="done"
      isLoading={doneLoading}
      onClick={onDone}
    />
  );
};

export default DoneTask;
