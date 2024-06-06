import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreationComponent } from './game-creation.component';

describe('GameEditorComponent', () => {
  let component: GameCreationComponent;
  let fixture: ComponentFixture<GameCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
