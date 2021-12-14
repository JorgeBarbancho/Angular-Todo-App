import {Component, OnInit} from '@angular/core';
import { faTh, faTasks, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-buttons',
  templateUrl: './list-buttons.component.html',
  styleUrls: ['./list-buttons.component.css']
})
export class ListButtonsComponent implements OnInit {

  faTh = faTh;
  faTasks = faTasks;
  falList = faList;

  constructor() { }

  ngOnInit(): void {
  }

}
