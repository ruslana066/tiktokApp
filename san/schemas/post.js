export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'caption',
            title: 'Caption',
            type: 'string'
        },
        {
            name: 'video',
            title: 'Vidio',
            type: 'file',
            options: {
                hotspot: true
            }
        },
        {
            name: 'userId',
            title: 'UserId',
            type: 'string' 
        },
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy'
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [{type: 'comment'}]
        },
        {
            name: 'likes',
            title: 'Likes',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type: 'user'}]
            }]
        },
        {
            name: 'topic',
            title: 'Topic',
            type: 'string'
        }
    ]
}