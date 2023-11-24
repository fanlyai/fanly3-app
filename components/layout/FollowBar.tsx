import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";
import { useState } from "react";
import Button from "../Button";
import { TonConnectButton } from "@tonconnect/ui-react";
import useCurrentUser from "@/hooks/useCurrentUser";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const [more , setMore] = useState(false)
  const {data : currentUser } = useCurrentUser();

  const maxUsers = users.slice(0,6)

  const slicedUsers = more ?  maxUsers : users.slice(0, 4);

  

  if (users.length === 0) {
    return null;
  }
  return (
    <div className="px-6 py-4 hidden lg:block">
       
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {slicedUsers
            ? slicedUsers.map((user: Record<string, any>) => (
              <>
                <div key={user.id} className="flex flex-row gap-4">
                  <Avatar userId={user.id} />
                  <div className="flex flex-col">
                    <p className="text-white font-semibold text-sm">
                      {user.name}
                    </p>
                    <p className="text-neutral-400 text-sm">@{user.username}</p>
                   
                  </div>
                 
                </div></>
              ))
            : []}
             <Button  label={more ? "Less" : "More"} onClick={()=>{setMore(!more)}}/>
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
