import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TODO_ITEM_STORAGE } from '../../service/todo-item-storage';
import { itemStorageSpy } from '../../service/todo-item-storage.mock';
import { TodoItemService } from '../../service/todo-item.service';
import { MaterialModule } from '../../shared/material/material.module';
import { UserTableComponent } from './user-table.component';


describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, ReactiveFormsModule],
      declarations: [ UserTableComponent ],
      providers: [
        TodoItemService,
        { provide: TODO_ITEM_STORAGE, useValue: itemStorageSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
