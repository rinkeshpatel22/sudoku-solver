import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new Subject<boolean>();
  public start(): void {
    this.isLoading.next(true);
  }
  public stop(): void {
    this.isLoading.next(false);
  }
}
