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
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { fetcher } from "../../libs/fetcher";
import RegisteredInput from "../common/RegisteredInput";

const AddProject = ({ userId, onClose, isOpen, refetch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const { mutate, isLoading } = useMutation(
    ["createProject"],
    (data) => fetcher.post("projects", data),
    {
      onSuccess: () => {
        onClose();
        refetch();
        reset();
      },
    }
  );

  const onSubmit = (values) => {
    mutate({ title: values.title, description: values.description, userId });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RegisteredInput
              errors={errors.title}
              label="Title"
              register={register("title", {
                required: true,
              })}
            />
            <RegisteredInput
              errors={errors.title}
              label="Description"
              register={register("description", {
                required: true,
              })}
            />
            <Flex w="full" align="center" gap={4} mt={4}>
              <Button colorScheme="green" isLoading={isLoading} type="submit">
                Add project
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

export default AddProject;
