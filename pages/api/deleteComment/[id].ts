import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

import { postDetailQuery } from "@/utils/queries";
import { client } from "@/utils/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { comment, postId } = req.body
    if(req.method === 'DELETE'){

      const data = await client
        .patch(postId)
        .unset(comment)
        .commit()

      res.status(200).json(data);
    }
}