import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitadsPage } from './invitads.page';

describe('InvitadsPage', () => {
  let component: InvitadsPage;
  let fixture: ComponentFixture<InvitadsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
