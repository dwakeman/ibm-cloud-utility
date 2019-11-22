import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceInstanceComponent } from './resource-instance.component';

describe('ResourceInstanceComponent', () => {
  let component: ResourceInstanceComponent;
  let fixture: ComponentFixture<ResourceInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
