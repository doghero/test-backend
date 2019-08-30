import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Host } from '@models/host';

@Injectable()
export class HostService {

  constructor(@Inject(forwardRef(() => HttpClient)) public http: HttpClient) { }

  public getMyHosts(): Observable<Host[]> {
    return of(this.mockedHosts());
  }

  public favorite(id: number): Observable<void> {
    return of(void 0);
  }

  public mockedHosts(): Host[] {
    return [
      this.mockedHost(1),
      this.mockedHost(2),
      this.mockedHost(3)
    ];
  }

  public mockedHost(hostNumber: number): Host {
    if (hostNumber === 1) {
      return new Host(
        1,
        'Host 1',
        'Cheio de amor para o seu Dog',
        'https://bit.ly/2KVbPF9',
        false
      );
    } else if (hostNumber === 2) {
      return new Host(
        2,
        'Host 2',
        'Super diversão com seu Dog',
        'https://bit.ly/2z7NxT5',
        true
      );
    }

    return new Host(
      3,
      'Host 3',
      'Cheio de amor para o seu Dog',
      'https://bit.ly/2KT2X2N',
      false
    );
  }
}
