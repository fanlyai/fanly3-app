import useFollowers from "@/hooks/useFollowers";
import Avatar from "./Avatar";

interface FollowersProps {
  userId: string;
}

const FollowersList: React.FC<FollowersProps> = ({ userId }) => {
  const { data: fetchedFollowers } = useFollowers(userId);

  return (
    <div className="px-6 py-4 ">
      {fetchedFollowers?.length !== 0 ? (
        <div className="bg-neutral-800 rounded-xl p-4">
          <div className="flex flex-col gap-6 mt-4  ">
            {fetchedFollowers?.map((users: Record<string, any>) => (
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
        <div className="text-white text-center p-6 text-xl">No following</div>
      )}
    </div>
  );
};

export default FollowersList;
