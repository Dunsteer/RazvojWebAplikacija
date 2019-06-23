import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserTableItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects]),
    HttpClientModule
  ],
  providers: [
    { provide: USER_STORAGE, useClass: UserStorageNgrxService },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
