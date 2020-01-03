import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  postsx = [
    {title: 'first post', content: 'content for first post'},
    {title: 'second post', content: 'content for second post'},
    {title: 'third post', content: 'content for third post'}
  ];
  posts = [ ];

}
