import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
    component.buttons = [
      { icon: faTh, selected: true },
      { icon: faTasks, selected: false },
      { icon: faList, selected: false },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Click should call onClick method', fakeAsync(() => {
    // Given
    spyOn(component.onButtonClick, 'emit');

    // When
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();

    // Then
    expect(component.onButtonClick.emit).toHaveBeenCalledOnceWith(0);
  }));
});
