import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { UserSort } from '../../model/user-sort';
import { User } from '../../models/user';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent extends BaseComponent implements OnInit {
  users$: Observable<User[]> = this.service.users$;
  hasUsers$: Observable<boolean> = this.users$.pipe(map(items => items.length > 0));
  //sort$: Observable<UserSort> = this.service.sort$;
  filter$: Observable<string> = this.service.filter$;
  //sortableFields = [{key: 'name', label: 'Name'}, {key: 'createdDateTime', label: 'Created Date & Time'}];

  constructor(private service: UserService,private _router: Router) {
    super();
   }

  ngOnInit() {
    this.service.loadItems();
  }

  deleteUser(id: number): void {
    this.service.removeItem(id);
  }

  onFilterChange(event: MatButtonToggleChange) {
    this.service.setFilterString(event.value);
  }

  onSortChange(value: string) {
    this.service.setSortField(value);
  }
}
