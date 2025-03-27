import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const getRepos = async () => {
  const response = await axios.get(`http://localhost:3000/api/repos`);
  return response.data;
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