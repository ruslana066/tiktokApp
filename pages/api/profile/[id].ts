import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

import { postDetailQuery, singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "@/utils/queries";
import { client } from "@/utils/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } : any = req.query;

        const query = singleUserQuery(id)
        const userVideosQuery = userCreatedPostsQuery(id)
        const userLikedVideoQuery = userLikedPostsQuery(id)

        const user = await client.fetch(query)
        const userVideo = await client.fetch(userVideosQuery)
        const userLikedVideo = await client.fetch(userLikedVideoQuery)

        const data = {
            user: user[0],
            userVideo, userLikedVideo
        }

        res.status(200).json(data)
    }
}