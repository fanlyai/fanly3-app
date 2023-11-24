import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useShowMedia = (postId:string ,mediaId?:string, userId?: string) => {
  const url = `/api/media?postId=${postId}&mediaId=${mediaId} `  ;
  const { data, error, isLoading, mutate  } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
    mediaId,
    postId
  }
};

export default useShowMedia;