import FollowersList from "@/components/FollowersList";

import Header from "@/components/Header";

import { useRouter } from "next/router";


const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  

  return (
    <>
      <Header showBackArrow label="Followers" />
     <FollowersList userId={userId as string}></FollowersList>
      
    </>
  );
};

export default UserView;
