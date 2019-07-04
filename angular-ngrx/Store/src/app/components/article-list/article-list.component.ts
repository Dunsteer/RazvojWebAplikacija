import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Observable } from 'rxjs';
import { ArticleService } from '../../service/article.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromOrderReducer from '../../statemanagement/order/order.reducer';
import * as fromOrderActions from '../../statemanagement/order/order.actions';
import * as fromArticleActions from '../../statemanagement/article/article.actions';
import { Order } from 'src/app/models/order';
import { BaseComponent } from '../base-component/base.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.sass']
})
export class ArticleListComponent extends BaseComponent implements OnInit {

  articles$: Observable<Article[]> = this.articleService.articles$;
  hasArticles$: Observable<boolean> = this.articles$.pipe(map(items => items.length > 0));
  filter$: Observable<string> = this.articleService.filter$;

  cart: Article[] = [];

  constructor(private articleService: ArticleService, private _store: Store<fromOrderReducer.State>, private _userService: UserService) {
    super(_userService);
  }

  ngOnInit() {
    this.articleService.loadItems();
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
  }
  addOneToArticle(article: Article) {
    if (article && article.selectedNumber < article.count) {
      article.selectedNumber++;
    }
  }
  removeOneToArticle(article: Article) {
    if (article) {
      if (article.selectedNumber > 1) {
        article.selectedNumber--;
      }
      else {
        this.cart = this.cart.filter(x => x.id != article.id);
      }
    } else {

    }
  }

  async submitOrder() {
    const order: Order = {
      articles: this.cart,
      userId: BaseComponent.currentUser.id,
      delivered: false
    }

    this._store.dispatch(new fromOrderActions.AddOrder({ order }));

    this.cart.forEach(article => {
      this.articleService.updateItem({ ...article, count: article.count - article.selectedNumber });
    })

    this.cart = [];
  }
}
