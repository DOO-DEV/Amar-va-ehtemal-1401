import { Flex, Box, IconButton } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BiPowerOff } from "react-icons/bi";
import { fetcher } from "../../libs/fetcher";
import AppBrand from "../shared/AppBrand";

const Header = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    ["logout"],
    () => fetcher.post("logout"),
    {
      onSuccess: () => {
        router.push("/sigin");
      },
    }
  );
  return (
    <Flex
      w="full"
      px={4}
      py={3}
      bg="#fff"
      pos="sticky"
      top={0}
      justify="space-between"
      boxShadow="0 1px 0 rgb(0 0 0 / 14%), 0 2px 0 rgb(0 0 0 / 5%)"
    >
      <AppBrand />
      <IconButton
        isLoading={isLoading}
        icon={<BiPowerOff />}
        onClick={() => mutate()}
      />
    </Flex>
  );
};

export default Header;
