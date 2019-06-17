import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsWarningCenterComponent } from './warning-center.component';

describe('StatisticsWarningCenterComponent', () => {
  let component: StatisticsWarningCenterComponent;
  let fixture: ComponentFixture<StatisticsWarningCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsWarningCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsWarningCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
