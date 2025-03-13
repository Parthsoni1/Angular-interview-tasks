import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-posts',
  standalone: true,
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css'],
  providers: [PostService],
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class ShowPostsComponent implements OnInit {
  posts: any[] = [];
  comments: any[] = [];
  userId: number | null = null;  
  commentForm!: FormGroup;
  selectedPostId: number | null = null;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
      if (this.userId) {
        this.loadPosts();
      }
    });

    
    this.commentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required]]
    });
  }

  loadPosts(): void {
    if (this.userId) {
      this.postService.getPostsByUser(this.userId).subscribe((data) => {
        this.posts = data;
      });
    }
  }

  loadComments(postId: number): void {
    this.selectedPostId = postId;
    this.postService.getCommentsByPost(postId).subscribe((data) => {
      this.comments = data;
    });
  }
}
