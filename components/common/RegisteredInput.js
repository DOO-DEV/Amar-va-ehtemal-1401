import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import ErrorMsg from "./ErrorMsg";

const RegisterInput = ({ errors, label, register, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl mb={2} isInvalid={!!errors}>
      <FormLabel fontSize="sm" fontWeight={600}>
        {label}
      </FormLabel>
      {type === "password" ? (
        <InputGroup>
          <InputRightElement>
            <Icon
              as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </InputRightElement>
          <Input
            type={showPassword ? "text" : "password"}
            _invalid={{ borderColor: "#b2001a", borderWidth: 2 }}
            {...register}
          />
        </InputGroup>
      ) : (
        <Input
          type="text"
          _invalid={{ borderColor: "#b2001a", borderWidth: 2 }}
          {...register}
        />
      )}
      {errors?.type === "required" && <ErrorMsg>Field is required</ErrorMsg>}
    </FormControl>
  );
};

export default RegisterInput;
