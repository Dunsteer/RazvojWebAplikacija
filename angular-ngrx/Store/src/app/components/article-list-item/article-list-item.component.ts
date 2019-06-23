import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/models/article';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.sass']
})
export class ArticleListItemComponent implements OnInit {

  @Input()
  article: Article;

  @Output()
  added : EventEmitter<Article> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  addToCartHandler() {
    if(!this.article.selectedNumber)
      this.article.selectedNumber = 1;
    this.added.emit(this.article);
  }
}
