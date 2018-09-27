import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiteBusquedaComponent } from './limite-busqueda.component';

describe('LimiteBusquedaComponent', () => {
  let component: LimiteBusquedaComponent;
  let fixture: ComponentFixture<LimiteBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimiteBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiteBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
