import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RepoInfoParam } from "./useRepos";

type RepoDetail = {name: string, code: string; readme: string; lang: string; params?: RepoInfoParam[]} 

const getRepo = async (id: string) => {
  const response = await axios.get(`https://gafarov.de:8443/api/repo/${id}`);
  console.log(response.data)
  return response.data as RepoDetail;
};

const useRepo = (id: string | undefined) => {
  return useQuery(
    {
      queryFn: () => getRepo(id!),
      queryKey: ["projects", id],
      staleTime: 1000 * 5,
      enabled: !!id
    })
};

export default useRepo;
