import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';
import { UserState } from './user-state';
import { Resource } from './resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceAliasesService {

  constructor(private authService: AuthService, private locationService: LocationService, private http: HttpClient) { }











}
