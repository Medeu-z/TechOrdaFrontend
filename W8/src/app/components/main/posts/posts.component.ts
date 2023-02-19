import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Post } from '../../../model/post.model';
import { PostsService } from '../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private router : Router
  ) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  onClickHandler(postId: number) {
    this.router.navigate(['/postdetails', postId]);
  }
}
