import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwDetailsComponent } from './veiw-details.component';

describe('VeiwDetailsComponent', () => {
  let component: VeiwDetailsComponent;
  let fixture: ComponentFixture<VeiwDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
