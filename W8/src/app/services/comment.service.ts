import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../model/comment.model';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient){ }

  getComments(postId: number) {
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`);
  }
}
