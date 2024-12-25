/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenAIService } from './GenAI.service';

describe('Service: GenAI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenAIService]
    });
  });

  it('should ...', inject([GenAIService], (service: GenAIService) => {
    expect(service).toBeTruthy();
  }));
});
