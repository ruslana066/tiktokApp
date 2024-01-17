import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

import { searchPostsQuery} from "@/utils/queries";
import { client } from "@/utils/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } : any = req.query;

        const videosQuery = searchPostsQuery(id)

        const videos = await client.fetch(videosQuery)

        // const data = {
        //     user: user[0],
        //     userVideo, userLikedVideo
        // }

        res.status(200).json(videos)
    }
}