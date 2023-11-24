import useSWR from "swr"

import fetcher from "@/libs/fetcher";

const useFollowing = (userId: string) => {
    const {
        data ,
        error , 
        isLoading , 
        mutate
    } = useSWR(`/api/users/following/${userId}`, fetcher);

    return {
        data,error,isLoading,mutate
    }
}

export default useFollowing;
