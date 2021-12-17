import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListButtonsComponent } from './list-buttons.component';
import { faList, faTasks, faTh } from '@fortawesome/free-solid-svg-icons';

describe('ListButtonsComponent', () => {
  let component: ListButtonsComponent;
  let fixture: ComponentFixture<ListButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.buttons = [
      { icon: faTh, selected: false },
      { icon: faTasks, selected: false },
      { icon: faList, selected: false },
    ];
  });

  /*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('ShowAll button should show all tasks', () => {
    component.onClick(component.buttons[0]);
    expect(component.buttons[0].selected).toBeTrue();
    expect(component.buttons[1].selected).toBeFalse();
    expect(component.buttons[2].selected).toBeFalse();
  });

  it('ShowComplete button should show completed tasks', () => {
    component.onClick(component.buttons[1]);
    expect(component.buttons[0].selected).toBeFalse();
    expect(component.buttons[1].selected).toBeTrue();
    expect(component.buttons[2].selected).toBeFalse();
  });

  it('ShowPending button should show pending tasks', () => {
    component.onClick(component.buttons[2]);
    expect(component.buttons[0].selected).toBeFalse();
    expect(component.buttons[1].selected).toBeFalse();
    expect(component.buttons[2].selected).toBeTrue();
  });
});
