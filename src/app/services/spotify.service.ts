import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders ,HttpParams,HttpClientJsonpModule} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { stringify } from '@angular/compiler/src/util';



@Injectable()
export class SpotifyService {
  
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;


  constructor(private _http: HttpClient) { }

  //todo - add err handling 
  // Get access token from Spotify to use API
  getAuth = () => {

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this._http.post('https://accounts.spotify.com/api/token', body, { headers: headers });
      
  }

getCategories(authToken: string,categoryId?:string ) {
  let categoryUrl:string;
  let headers = new HttpHeaders();
  let appendParam:string;
  headers=headers.append('Authorization', 'Bearer ' + authToken);
  appendParam =categoryId?"/"+categoryId:'?limit=30&market=IL'
  categoryUrl = 'https://api.spotify.com/v1/browse/categories'+appendParam;
  return this._http.get(categoryUrl, { headers: headers });
  
}

getCategoryPlailists(authToken: string,categoryId:string ) {
  let categoryUrl:string;
  let headers = new HttpHeaders();
  let appendParam:string;
  headers=headers.append('Authorization', 'Bearer ' + authToken);
  appendParam ="/"+categoryId+'/playlists?limit=30'
  categoryUrl = 'https://api.spotify.com/v1/browse/categories'+appendParam;
  return this._http.get(categoryUrl, { headers: headers });
  
}

 
  searchMusic(query: string, type = 'artist', authToken: string) {
    let searchUrl:string;
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + authToken);
    searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=20&type=' + type + '&market=IL';
    return this._http.get(searchUrl, { headers: headers });
      
  }
  getPlaylist( authToken: string,playlistId: string,) {
    let playlistUrl:string;
    let headers = new HttpHeaders();
    headers=headers.append('Authorization', 'Bearer ' + authToken);

    playlistUrl = 'https://api.spotify.com/v1/playlists/'+playlistId;
    return this._http.get(playlistUrl, { headers: headers });
  }

  
  getPlaylistItems( authToken: string,playlistId: string,) {
    let playlistUrl:string;
    let headers = new HttpHeaders();
    headers=headers.append('Authorization', 'Bearer ' + authToken);

    playlistUrl = 'https://api.spotify.com/v1/playlists/'+playlistId+'/tracks';
    return this._http.get(playlistUrl, { headers: headers });
  }

  
}
