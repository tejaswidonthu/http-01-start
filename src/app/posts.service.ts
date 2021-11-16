import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";


@Injectable()
export class PostService {
error = new Subject<string>(); 
constructor(private http : HttpClient){};

CreatePostandStore(title : string, content : string){
    const postData : Post = {title:title,content:content};
    this.http.post<{ name : String }>('https://ng-startup-guide-default-rtdb.firebaseio.com/posts.json',postData).subscribe(responseData=>{
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });      
}

FetchPost(){
   return this.http.get< {[key : string]: Post} >('https://ng-startup-guide-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray : Post[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
        postsArray.push({ ...responseData[key], id: key })
      }
    }
    return postsArray;
    }));
}

ClearPost(){
   return this.http.delete('https://ng-startup-guide-default-rtdb.firebaseio.com/posts.json');
}

}