import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Observable } from 'rxjs';
import { ArticleService } from '../../service/article.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.sass']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]> = this.service.articles$;
  hasArticles$: Observable<boolean> = this.articles$.pipe(map(items => items.length > 0));
  filter$: Observable<string> = this.service.filter$;

  cart: Article[] = [];

  constructor(private service: ArticleService) { }

  ngOnInit() {
    this.service.loadItems();
  }

  calculateArticleSum() {
    return this.cart.reduce((acc, x) => acc + x.price * x.selectedNumber, 0);
  }

  addArticleToCart(article: Article) {
    let inCart = this.cart.find(x => x.id == article.id);
    if (inCart) {
      inCart.selectedNumber++;
    }
    else {
      this.cart.push(article);
    }
    console.log(this.cart);
  }
}
