import { fetcher } from "./fetcher";

export const auth = (data) => {
  return fetcher("auth", data);
};
