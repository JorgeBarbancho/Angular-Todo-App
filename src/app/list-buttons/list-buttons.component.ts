import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListButton } from '../list-button';

@Component({
  selector: 'app-list-buttons',
  templateUrl: './list-buttons.component.html',
  styleUrls: ['./list-buttons.component.css'],
})
export class ListButtonsComponent {
  @Input()
  public buttons: ListButton[] = [];

  @Output()
  public onButtonClick = new EventEmitter<number>();

  public onClick(clickedButton: ListButton): void {
    this.onButtonClick.emit(this.buttons.indexOf(clickedButton));
  }
}
