import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy{
  loadedPosts : Post[] = [];
  isFetching = false;
  error = null;
  private errorSubscription : Subscription;
  constructor(private http: HttpClient, private postService : PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.CreatePostandStore(postData.title, postData.content);   
    this.loadedPosts.push(postData);   
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
    this.postService.ClearPost().subscribe(() => {
      this.loadedPosts = [];
    });    
  }

  private fetchPost(){
    this.isFetching = true;
    this.postService.FetchPost().subscribe(posts => {
    this.isFetching = false;
    this.loadedPosts = posts;
    }, error => {
    this.isFetching = false;      
    this.error = error.statusText +" >> "+ error.message;
    });
  }

  onErrorFetch(){
    this.error = null;
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
  }
}
