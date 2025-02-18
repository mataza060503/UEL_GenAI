import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private refreshMenuSource = new Subject<void>();
  refreshMenu$ = this.refreshMenuSource.asObservable();

  triggerRefresh() {
    this.refreshMenuSource.next();
  }

}
