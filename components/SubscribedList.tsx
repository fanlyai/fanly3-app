
import useSubscriber from "@/hooks/useSubscriber";
import Avatar from "./Avatar";


interface SubscriberProps {
  userId: string;
}

const SubscriberList: React.FC<SubscriberProps> = ({ userId }) => {
  const { data: fetchedSubscribers } = useSubscriber(userId);

  return (
    <div className="px-6 py-4 ">
      {fetchedSubscribers?.length !== 0 ? (
        <div className="bg-neutral-800 rounded-xl p-4">
          <div className="flex flex-col gap-6 mt-4  ">
            {fetchedSubscribers?.map((users: Record<string, any>) => (
              <div
                key={users.id}
                className="flex flex-row hover:bg-neutral-700  rounded-xl p-2 gap-4"
              >
                <Avatar userId={users.id} />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">
                    {users.name}
                  </p>
                  <p className="text-neutral-400  text-sm">@{users.username}</p>
                </div>
              </div>
            ))}
           
          </div>
        </div>
      ) : (
        <div className="text-white text-center p-6 text-xl">No Subscribed Account</div>
      )}
    </div>
  );
};

export default SubscriberList;
