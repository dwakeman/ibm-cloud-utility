import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceInstancesComponent } from './resource-instances.component';

describe('ResourceInstancesComponent', () => {
  let component: ResourceInstancesComponent;
  let fixture: ComponentFixture<ResourceInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
