import { Component, Input, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Postdetail } from './../../../model/postdetail.model';
import { Comment } from '../../../model/comment.model';
import { PostsService } from '../../../services/post.service';
import { CommentsService } from '../../../services/comment.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent {
  @Input() post!: Postdetail;
  comments: Comment[] = [];

  constructor(
    private router : Router, 
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentService: CommentsService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.postsService.getPost(id).subscribe((post) => (this.post = post));
    this.commentService.getComments(id).subscribe((comments) => (this.comments = comments));
  }

  onClickHandler() {
    this.router.navigate(['/posts']);
  }
}
