import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user-table-item',
  templateUrl: './user-table-item.component.html',
  styleUrls: ['./user-table-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableItemComponent {

  @Input() item: User;
  @Output() delete = new EventEmitter<number>();

  onDeleteClicked(): void {
    this.delete.emit(this.item.id);
  }

}
