import { TestBed } from '@angular/core/testing';

import { ProyectoMusicService } from './proyecto-music.service';

describe('ProyectoMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProyectoMusicService = TestBed.get(ProyectoMusicService);
    expect(service).toBeTruthy();
  });
});
