import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseGridComponent } from './response-grid.component';

describe('ResponseGridComponent', () => {
  let component: ResponseGridComponent;
  let fixture: ComponentFixture<ResponseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
