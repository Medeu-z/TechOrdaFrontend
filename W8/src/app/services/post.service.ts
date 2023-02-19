import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post.model';
import { Postdetail } from '../model/postdetail.model';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient){ }

  getPosts() {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

  getPost(postId: number) {
    return this.http.get<Postdetail>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
}
