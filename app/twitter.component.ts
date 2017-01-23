import { Component, OnInit } from '@angular/core';
import { Tweet } from './models/tweet';
import { TwitterService } from './twitter-service';
import { routing } from './app.routes';
import { ActivatedRoute, Router } from '@angular/router';

//when @component is present the app won't run
@Component({
    selector: 'twitter-app',
    templateUrl: 'app/twitter.component.html',
    styleUrls: ['app/twitter.component.css'],
    providers: [TwitterService]
})
export class TwitterComponent implements OnInit {

    tweets: Tweet[];
    query: string;
    sub: any;
    errorMessage: string;
    isLoading: boolean = true;
    submitted: boolean = false;

    constructor(private twitterService: TwitterService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.isLoading = true;

        this.sub = this.route.params.subscribe(params => {
            //set default zip - could use browser coordinates to get default - see angular2-google-map
            let query = 'angular2';
            this.twitterService.getTweets(query).subscribe(
                t => {
                    this.tweets = t;
                    this.query = query;
                    console.log('query: ' + this.query + '; loaded tweets: ' + JSON.stringify(this.tweets));
                }, e => this.errorMessage = e, () => this.isLoading = false
            );
        });

        this.isLoading = false;
    }

    getTweets() {
        this.isLoading = true;
        let query = this.query;//store zip in temp
        this.submitted = true;

        this.sub = this.route.params.subscribe(params => {
            if (this.query) {
                this.twitterService.getTweets(this.query).subscribe(
                    t => {
                        this.tweets = t;
                        this.query = query;
                    }, e => { this.errorMessage = e; console.log('error: ' + e) }, () => this.isLoading = false
                );
            }
        });

    }



}