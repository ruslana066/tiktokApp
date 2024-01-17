import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { MdFavorite } from 'react-icons/md' 
import userAuthStore from '@/store/authStore'

interface IProps {
    likes: any;
    handleLike: () => void;
    handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({likes, handleLike, handleDislike}) => {

    const [alredyLiked, setAlredyLiked] = useState(false)

    const { userProfile } : any = userAuthStore()

    const filterLikes = likes?.filter((item : any) => item._ref === userProfile?._id )

    useEffect(() => {
        if(filterLikes?.length > 0) {
            setAlredyLiked(true)
        } else {
            setAlredyLiked(false)
        }
    }, [filterLikes])

    // console.log(likes)

  return (
    <div className='flex gap-6' >
        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer' >
            {alredyLiked ? (
                <div className='bg-primary rounded-full p-2 md:p-4 text-[#f51997]' onClick={handleDislike} >
                    <MdFavorite className="text-lg md:text-2xl" />
                </div>
            ) : (
                <div className='bg-primary rounded-full p-2 md:p-4' onClick={handleLike} >
                    <MdFavorite className="text-lg md:text-2xl" />
                </div>
            )}
            <p className='text-md font-semibold' >
               {likes?.length || 0}
            </p>
        </div>
    </div>
  )
}

export default LikeButton
