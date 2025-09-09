import { useMutation} from "@tanstack/react-query";
import axios from "axios";

type ExecParams = {id : string, values: object}

const getExec = async (params : ExecParams) => {
  const response = await axios.get(`https://gafarov.de:8443/api/exec`,{params: {params}});
  return response.data.data;
};

const useExec = () => {
  return useMutation(
    {
      mutationFn: (params : ExecParams) => getExec(params),
      onSuccess: () => console.log("success")
    })
};

export default useExec;