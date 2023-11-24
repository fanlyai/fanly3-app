import Avatar from "./Avatar";
import useSubscribing from "@/hooks/useSubscribing";

interface SubscriberProps {
  userId: string;
}

const SubscribedList: React.FC<SubscriberProps> = ({ userId }) => {
  const { data: fetchedSubscribers } = useSubscribing(userId);

  return (
    <div className="px-6 py-4 ">
      <p className="py-4 bg-sky-600 rounded-2xl flex justify-center mb-4 text-white">
        Subscriptions : {fetchedSubscribers?.length}
      </p>
      {fetchedSubscribers?.length !== 0 ? (
        <div className="bg-neutral-800 rounded-xl p-4">
          <div className="flex flex-col gap-6 mt-4  ">
            {fetchedSubscribers?.map((users: Record<string, any>) => (
              <div
                key={users.id}
                className="flex flex-col md:flex-row justify-between items-center  hover:bg-neutral-700  rounded-xl p-2 gap-4"
              >
                <div className="w-full flex  items-center">
                  <Avatar userId={users.id} />
                  <div className="flex pl-4 flex-col">
                    <p className="text-white font-semibold text-sm">
                      {users.name}
                    </p>
                    <p className="text-neutral-400  text-sm">
                      @{users.username}
                    </p>
                    <p className="text-neutral-400  text-xs">
                      until : DATE
                    </p>
                  </div>
                 
                </div> <div className="text-white pr-4 flex cursor-pointer text-center py-2 px-4 rounded-3xl bg-red-600">End</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white text-center p-6 text-xl">No Subscribers</div>
      )}
    </div>
  );
};

export default SubscribedList;
