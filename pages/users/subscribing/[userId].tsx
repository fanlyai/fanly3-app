
import Header from "@/components/Header";
import SubscriberList from "@/components/SubscriberList";

import { useRouter } from "next/router";


const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  

  return (
    <>
      <Header showBackArrow label="Subscribing" />
     <SubscriberList userId={userId as string}/>
      
    </>
  );
};

export default UserView;
