import useSWR from "swr"

import fetcher from "@/libs/fetcher";

const useFollowers = (userId: string) => {
    const {
        data ,
        error , 
        isLoading , 
        mutate
    } = useSWR(`/api/users/followers/${userId}`, fetcher);

    return {
        data,error,isLoading,mutate
    }
}

export default useFollowers;
