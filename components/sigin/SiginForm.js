import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "../../libs/fetcher";
import { auth } from "../../libs/mutation";
import ErrorMsg from "../common/ErrorMsg";
import RegisterInput from "../common/RegisteredInput";

const SiginForm = () => {
  const toast = useToast();
  const { mutate, isLoading: loading } = useMutation(
    ["signin"],
    (data) => fetcher.post("auth", data).then((r) => r.data),
    {
      onSuccess: (data) => {
        toast({
          description: "You successfully enter",
          status: "success",
          duration: 2000,
          position: "top",
        });
        if (data.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/customer");
        }
      },
      onError: () => {
        toast({
          description: "Your information is wrong.",
          status: "error",
          duration: 2500,
          position: "top",
        });
      },
    }
  );
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    mutate({ email: values.email, password: values.password });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RegisterInput
        errors={errors.email}
        label="email"
        type="text"
        register={register("email", {
          required: true,
        })}
      />
      <RegisterInput
        errors={errors.password}
        label="Password"
        type="password"
        register={register("password", {
          required: true,
        })}
      />
      <Button w="full" type="submit" colorScheme="teal" isLoading={loading}>
        Sigin
      </Button>
    </form>
  );
};

export default SiginForm;
