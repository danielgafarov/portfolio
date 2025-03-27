import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const getExec = async (id:string) => {
  const response = await axios.get(`http://localhost:3000/api/exec/${id}`);
  return response.data.data;
};

const useExec = (id:string | undefined) => {
  return useQuery(
    {
      queryFn: () => getExec(id!),
      queryKey: ["execResult"],
      staleTime: 1000 * 5, enabled:false
    })
};

export default useExec;