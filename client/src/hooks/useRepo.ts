import { useQuery} from "@tanstack/react-query";
import axios from "axios";


const getRepo= async (id:string) => {
  const response = await axios.get(`http://localhost:3000/api/repo/${id}`);
  return response.data;
};

const useRepo = (id:string | undefined) => {
  return useQuery(
    {queryFn: () => getRepo(id!),
    queryKey: ["projects",id],
    staleTime: 1000 * 5, 
    enabled: !!id})
};

export default useRepo;
