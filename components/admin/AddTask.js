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
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { fetcher } from "../../libs/fetcher";
import ErrorMsg from "../common/ErrorMsg";
import RegisteredInput from "../common/RegisteredInput";

const AddTask = ({ projectId, onClose, isOpen, refetch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const { mutate, isLoading } = useMutation(
    ["createTask"],
    (data) => fetcher.post(`projects/tasks/${projectId}`, data),
    {
      onSuccess: () => {
        onClose();
        refetch();
        reset();
      },
    }
  );

  const onSubmit = (values) => {
    mutate({ name: values.name, priority: values.priority, projectId });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RegisteredInput
              errors={errors.name}
              label="Name"
              register={register("name", {
                required: true,
              })}
            />
            <FormControl isInvalid={errors.priority}>
              <FormLabel fontSize="sm" fontWeight={600}>
                Priority
              </FormLabel>
              <Select
                {...register("priority", {
                  required: true,
                })}
              >
                <option value="">Select priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FormControl>
            {errors.priority && <ErrorMsg>This field is required</ErrorMsg>}
            <Flex w="full" align="center" gap={4} mt={4}>
              <Button colorScheme="green" isLoading={isLoading} type="submit">
                Add Task
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTask;
