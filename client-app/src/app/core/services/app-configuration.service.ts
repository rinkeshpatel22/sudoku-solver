import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../Constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  constructor(private httpClient: HttpClient) { }

  public getConfig(): void {
    this.httpClient.get(AppConstants.CONFIG_LOCATION).subscribe(response => {
      localStorage.setItem(AppConstants.WEB_API_BASE_URL, response[AppConstants.WEB_API_BASE_URL]);
    });
  }
}
