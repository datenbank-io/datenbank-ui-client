import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceFormComponent } from './form.component';

describe('AddComponent', () => {
  let component: DatasourceFormComponent;
  let fixture: ComponentFixture<DatasourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
