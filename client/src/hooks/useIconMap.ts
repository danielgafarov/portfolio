import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const getIconMap = async () => {
  const response = await axios.get(`http://localhost:3000/api/iconMap`);
  return response.data;
};

const useIconMap = () => {
  return useQuery(
    {
      queryFn: getIconMap,
      queryKey: ["iconMap"],
      staleTime: 1000 * 5
    })
};

export default useIconMap;
