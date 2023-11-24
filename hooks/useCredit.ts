import useSWR from "swr"

import fetcher from "@/libs/fetcher";

const useCredit = (userId: string) => {
    const {
        data ,
        error , 
        isLoading , 
        mutate
    } = useSWR(`/api/users/credit/${userId}`, fetcher);

    return {
        data,error,isLoading,mutate
    }
}

export default useCredit;
