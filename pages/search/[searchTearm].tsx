import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";
import useAuthStore from "@/store/authStore";
import { IUser, Video } from "@/types";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();

  const router = useRouter();
  const { searchTearm }: any = router.query;

  console.log(searchTearm)

  const searchedAccount = allUsers?.filter((user: IUser) =>
    user.userName.toLocaleLowerCase().includes(searchTearm)
  );

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const videosClass = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={` ${accounts} text-xl font-semibold mt-2 cursor-pointer`}
          onClick={() => setIsAccounts(true)}
        >
          Account
        </p>
        <p
          className={` ${videosClass} text-xl font-semibold mt-2 cursor-pointer`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="mt-6">
          {searchedAccount.length > 0 ? (
            searchedAccount?.map((user: IUser, i: number) => (
              <Link href={`/profile/${user._id}`} key={i}>
                <div className="flex gap-3 hover:bg-primaty p-2 cursor-pointer">
                  <div className="w-8 h-8">
                    <Image
                      src={user?.image}
                      alt="prufile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                  <div className="hidden xl:block">
                    <p className="flex gap-1 items-center text-md font-bold lowercase">
                      {user?.userName.replace(/\s+/g, "")}
                      {"  "}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize">{user?.userName}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`no results for ${searchTearm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex-wrap gap-6 md:justify-center">
          {videos?.length > 0 ? (
            videos?.map((post: Video, index: number) => (
              <VideoCard key={index} post={post} />
            ))
          ) : (
            <NoResults text={`no results for ${searchTearm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTearm },
}: {
  params: { searchTearm: string };
}) => {
  const res = await axios.get(`http://localhost:3000/api/search/${searchTearm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
