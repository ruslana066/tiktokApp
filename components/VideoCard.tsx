import React, {useRef, useState, useEffect} from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

import { Video } from '@/types'

interface IProps {
    post: Video;
    isShowingOnHome?: boolean;
}


const VideoCard: NextPage<IProps> = ({post : { caption, postedBy, video, _id, likes }, isShowingOnHome }) => {

    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if(playing) {
            videoRef?.current?.pause();
            setPlaying(false)
        }
        else {
            videoRef?.current?.play();
            setPlaying(true)
        }
    }

    if(videoRef?.current) {
        videoRef.current.muted = isVideoMuted;
    }

    if(!isShowingOnHome) {
        return (
            <div>
                <Link href={`/detail/${_id}`}>
                    <video src={video.asset.url} loop className='w-[250px] md:w-full rounded-xl'></video>
                </Link>
                <div className='flex gap-2 mt-8 items-center ml-4' >
                    <p className='text-white text-lg font-medium flex gap-1 items-center' >
                        <BsPlay className='text-2xl' />
                        {likes?.length || 0}
                    </p>
                </div>
                {/* <Link href='' >
                    <p className='mt-2 text-md text-grey-800 cursor-pointer' >{caption}</p>
                </Link> */}
            </div>
        )
    }

    // console.log(postedBy)


  return (
    <div className='flex flex-col border-b-2 border-grey-200 pb-6' >
        <div className='flex items-center gap-2' >
            <div className='md:w-16 md:h-16 w-10 h-10' >
                <Link href={`/profile/${postedBy?._id}`} >
                    { postedBy?.image && <Image className='rounded-full ' src={postedBy?.image} alt='' width={60} height={60} />}
                </Link>
            </div>
            <div className='ml-1' >
                <Link href={`/profile/${postedBy?._id}`} className='flex items-center' >
                    <div className='flex items-center gap-2' >
                        <p className='flex gap-2 items-center md:text-md font-bold text-primaty' >
                            {postedBy?.userName}
                            <GoVerified className='' />
                        </p>
                    </div>
                </Link>
            </div>
            
        </div>
        <div className='relative lg:ml-20 flex gap-4 justify-center h-[500px]' >
            <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='rounded-3xl'>
                <Link href={`/detail/${_id}`} className='flex justify-center' >
                    <video 
                        loop
                        ref={videoRef}
                        src={video.asset.url}
                        className='h-[500px] md:w-full rounded-xl cursor-pointer '>
                    </video>
                </Link>
                {
                    isHover && 
                        <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'  >
                            {
                                playing ? 
                                (<button onClick={onVideoPress} className='text-black text-2xl lg:text-4xl' > 
                                    <BsFillPauseFill /> 
                                </button>) : 
                                (<button onClick={onVideoPress} className='text-black text-2xl lg:text-4xl' > 
                                    <BsFillPlayFill/> 
                                </button>)
                            }    
                            {
                                isVideoMuted ? 
                                (<button onClick={() => setIsVideoMuted(false)} >
                                    <HiVolumeOff/>
                                </button>) :
                                (<button onClick={() => setIsVideoMuted(true)} >
                                    <HiVolumeUp/>
                                </button>)
                            }
                        </div>
                }
            </div>
        </div>
      
    </div>
  )
}

export default VideoCard

