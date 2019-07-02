import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './statemanagement';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserStorageNgrxService } from './statemanagement/user/user-storage-ngrx.service';
import { USER_STORAGE } from './service/user-storage';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserTableItemComponent } from './components/user-table-item/user-table-item.component';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './statemanagement/user/user.effects';
import { UserService } from './service/user.service';
import { HomeComponent } from './components/home/home.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';
import { ARTICLE_STORAGE } from './service/article-storage';
import { ArticleStorageNgrxService } from './statemanagement/article/article-storage-ngrx.service';
import { ArticleEffects } from './statemanagement/article/article.effects';
import { OrderEffects } from './statemanagement/order/order.effects';
import { ORDER_STORAGE } from './service/order-storage';
import { OrderStorageNgrxService } from './statemanagement/order/order-storage-ngrx.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserTableItemComponent,
    HomeComponent,
    ArticleListComponent,
    ArticleListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects, ArticleEffects, OrderEffects]),
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    { provide: USER_STORAGE, useClass: UserStorageNgrxService },
    { provide: ARTICLE_STORAGE, useClass: ArticleStorageNgrxService },
    { provide:ORDER_STORAGE, useClass:OrderStorageNgrxService},
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
