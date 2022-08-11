import { useQuery } from "react-query";
import httpRequest from "../utils/httpRequest";

export default function useGetRecipes(select) {
    return useQuery(["games"], () => httpRequest.getRecipes(), {
        select,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        retry: 1,
    });
}
