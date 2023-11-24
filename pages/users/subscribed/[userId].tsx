
import Header from "@/components/Header";
import SubscribedList from "@/components/SubscribedList";

import { useRouter } from "next/router";


const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  

  return (
    <>
      <Header showBackArrow label="Subscriber" />
     <SubscribedList userId={userId as string}/>
      
    </>
  );
};

export default UserView;
