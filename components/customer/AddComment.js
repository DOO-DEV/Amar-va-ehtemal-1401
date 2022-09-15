import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Flex,
  Button,
  Select,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ErrorMsg from "../common/ErrorMsg";
import { fetcher } from "../../libs/fetcher";

const AddComment = ({
  projectId,
  taskId,
  userComment,
  refetch,
  isOpen,
  onClose,
}) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const { mutate, isLoading } = useMutation(
    ["createTask"],
    (data) => fetcher.put(`projects/tasks/${projectId}`, data),
    {
      onSuccess: () => {
        onClose();
        refetch();
      },
    }
  );

  const onSubmit = (values) => {
    mutate({ taskId, userComment: values[`comment#${taskId}`] });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Add comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.priority}>
              <FormLabel fontSize="sm" fontWeight={600}>
                Comment
              </FormLabel>
              <Textarea
                defaultValue={userComment}
                h={120}
                resize="none"
                isInvalid={errors[`comment#${taskId}`]}
                {...register(`comment#${taskId}`, {
                  required: true,
                })}
              />
            </FormControl>
            {errors[`comment#${taskId}`] && (
              <ErrorMsg>This field is required</ErrorMsg>
            )}
            <Flex w="full" align="center" gap={4} mt={4}>
              <Button colorScheme="green" isLoading={isLoading} type="submit">
                Send comment
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddComment;
