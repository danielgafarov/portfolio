import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconName } from "lucide-react/dynamic";

export type RepoInfoParam = {name: string; type: string; default: string | number | boolean}
export type RepoInfo = {name: string; code: string; lang: string; params?: RepoInfoParam[]; icon: IconName; description: string}

const getRepos = async () => {
  const response = await axios.get(`http://130.61.157.39:3000/api/repos`);
  return response.data as RepoInfo[];
};

const useRepos = () => {
  return useQuery(
    {
      queryFn: getRepos,
      queryKey: ["repos"],
      staleTime: 1000 * 5
    })
};

export default useRepos;