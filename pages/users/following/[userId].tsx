import FollowingList from "@/components/FollowingList";
import Header from "@/components/Header";

import { useRouter } from "next/router";


const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  

  return (
    <>
      <Header showBackArrow label="Following" />
     <FollowingList userId={userId as string}></FollowingList>
      
    </>
  );
};

export default UserView;
