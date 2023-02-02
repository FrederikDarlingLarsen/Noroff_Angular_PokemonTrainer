import { TestBed } from '@angular/core/testing';

import { PokemonPokelogueService } from './pokemon-pokelogue.service';

describe('PokemonPokelogueService', () => {
  let service: PokemonPokelogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonPokelogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
