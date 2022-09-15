import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetcher } from "./fetcher";

export const useUsers = () => {
  const { data, isLoading, error } = useQuery(
    ["getUsers"],
    () => fetcher.get("users").then((r) => r.data),
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    users: data,
    err: !!error,
    isLoading,
  };
};

export const useGetProjects = (userId) => {
  const { data, isLoading, error, refetch, isFetching } = useQuery(
    ["getUserProjects"],
    () => fetcher.get(`/projects/${userId}`).then((r) => r.data),
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    projects: data,
    isLoading,
    err: !!error,
    refetch,
    isFetching,
  };
};

export const useGetTasks = (projectId) => {
  const {
    data: tasks,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery(
    ["getTasks"],
    () => fetcher(`projects/tasks/${projectId}`).then((r) => r.data),
    { refetchOnWindowFocus: false }
  );
  return {
    tasks,
    isLoading,
    isFetching,
    refetch,
    err: !!error,
  };
};
