import { useMutation} from "@tanstack/react-query";
import axios from "axios";


const getExec = async (params) => {
  const response = await axios.get(`http://localhost:3000/api/exec`,{params: {params}});
  return response.data.data;
};

const useExec = () => {
  return useMutation(
    {
      mutationFn: ({params} : {params: unknown}) => getExec(params),
      onSuccess: () => console.log("success")
    })
};

export default useExec;