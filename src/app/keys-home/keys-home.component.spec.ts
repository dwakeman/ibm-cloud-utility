import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysHomeComponent } from './keys-home.component';

describe('KeysHomeComponent', () => {
  let component: KeysHomeComponent;
  let fixture: ComponentFixture<KeysHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
