import {Component, Input} from '@angular/core';
import {faList, faTasks, faTh} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-buttons',
  templateUrl: './list-buttons.component.html',
  styleUrls: ['./list-buttons.component.css']
})
export class ListButtonsComponent {

  // Readonly view variables
  public readonly faTh = faTh;
  public readonly faTasks = faTasks;
  public readonly faList = faList;

  // State
  public showingAll: boolean = true;
  public showingCompleted: boolean = false;
  public showingPending: boolean = false;

  @Input() public showAll: any;
  @Input() public showCompleted: any;
  @Input() public showPending: any;

  public onShowAllClick(): void {
    this.showAll();
    this.showingAll = true;
    this.showingCompleted = false;
    this.showingPending = false;
  }

  public onShowCompletedClick(): void {
    this.showCompleted();
    this.showingAll = false;
    this.showingCompleted = true;
    this.showingPending = false;
  }

  public onShowPendingClick(): void {
    this.showPending();
    this.showingAll = false;
    this.showingCompleted = false;
    this.showingPending = true;
  }

}
