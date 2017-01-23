export interface Tweet {
    created_at: string,
    text: string,
    //user attributes
    name: string,
    screenname: string,
    profile_image_url: string,
    follower_count: number,
    //quotedstatus.entities.media[]
    url: string,
    expanded_url: string,
    media_url: string,
    media_url_https: string,
    media_type: string //photo 
    // sized:{}
}