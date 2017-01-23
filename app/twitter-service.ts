import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Tweet } from './models/tweet';
import { Logger } from 'angular2-logger/core';

@Injectable()
export class TwitterService {
    // Resolve HTTP using the constructor
    constructor(private http: Http, private logger: Logger) { }


    // private instance variable to hold base url
    private baseUrl = 'http://localhost:3000';
    private queryPath = '/query:';

    getTweets(query: string): Observable<Tweet[]> {

        // this.logger.log('first log message from log4ng');

        if (query) {
            let result = this.http.get(`${this.baseUrl}${this.queryPath}${query}`, { headers: this.getHeaders() })
                // ...and calling .json() on the response to return data
                .map((mapTweets))
                //...errors if any
                .catch((error: any) => Observable.throw(error || 'Server error'));

            return result;
        }
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}

function mapTweets(response: Response): Tweet[] {
    return toTweets(response.json());
}


function parseTweet(r: any) {

    let tweet = <Tweet>({
        created_at: r.created_at,
        text: r.text,
        name: r.user.name,
        screenname: r.user.screen_name
    });

    let e = r.entities;
   // printkeys(e);

    if (e && e.media && e.media[0].type == 'photo') {
        let m = e.media[0];
        tweet.profile_image_url = m.profile_image_url;
        tweet.follower_count = m.follower_count;
        tweet.url = m.url;
        tweet.expanded_url = m.expanded_url;
        tweet.media_url = m.media_url;
        tweet.media_url_https = m.media_url_https;
        tweet.media_type = m.type; //photo 
    }
    return tweet;

}
function toTweets(r: any): Tweet[] {

    let tweets: Tweet[] = [];

    for (var status in r.statuses) {
        tweets.push(parseTweet(r.statuses[status]));
    }

    console.log('# of tweets' + tweets.length);
    return tweets;
}


function printkeys(result: any) {
    for (var k in result) {
        if (typeof result[k] !== 'function') {
            console.log("Key is " + k + ", value is" + result[k]);
        }
    }
}