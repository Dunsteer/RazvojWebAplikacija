import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { createTodoItem } from '../../model/todo-item';
import { MaterialModule } from '../../shared/material/material.module';
import { UserTableItemComponent } from './user-table-item.component';
import { createUser } from 'src/app/model/user';

describe('UserTableItemComponent', () => {
  let component: UserTableItemComponent;
  let fixture: ComponentFixture<UserTableItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, RouterTestingModule],
      declarations: [ UserTableItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableItemComponent);
    component = fixture.componentInstance;
    component.item = createUser(-1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
