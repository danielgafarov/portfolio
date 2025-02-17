import { useQuery} from "@tanstack/react-query";
import axios from "axios";


const getResult = async () => {
  const response = await axios.get(`http://localhost:3000/api/result`);
  return response.data.data;
};

const useResult = () => {
  return useQuery(
    {queryFn: getResult,
    queryKey: ["result"],
    staleTime: 1000 * 5})
};

export default useResult;