import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  getWorkers() {
    return JSON.stringify([
      { id: 416, name: 'Зариф' },
      { id: 470, name: 'Бегзод' },
      { id: 145, name: 'Бобур' },
      { id: 469, name: 'Гайрат' },
      { id: 295, name: '' },
      { id: 501, name: '' },
    ]);
  }
}
