import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceRemoveComponent } from './remove.component';

describe('DatasourceRemoveComponent', () => {
  let component: DatasourceRemoveComponent;
  let fixture: ComponentFixture<DatasourceRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
