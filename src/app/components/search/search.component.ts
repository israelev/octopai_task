
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Artist } from 'src/app/models/artist.model';
import { Album } from 'src/app/models/album.model';
import { Playlist } from 'src/app/models/playlist.model';
import { Category } from 'src/app/models/category.model';


@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  providers: [SpotifyService],

})
export class SearchComponent implements OnInit {

  categories: Category[];
  artists: Artist[];
  albums: Album[]
  playlists: Playlist[];

  limitArtists: number = 4;
  limitAlbums: number = 4;
  limitPlaylists: number = 4;
  query: FormControl = new FormControl();
  showCategory: boolean = true;
  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit() {
    this.query.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(query => this._spotifyService.getAuth()
        .subscribe(res => {
          if (query) {
            this.showCategory = false;
            this.getArtist(query, res.access_token);
            this.getAlbums(query, res.access_token);
            this.getPlaylists(query, res.access_token);
          }

        }));

    this.getCtegories();
  }

  getCtegories() {
    this._spotifyService.getAuth()
      .subscribe(res => this._spotifyService.getCategories(res.access_token).subscribe(
        (res: { categories: { items: Category[]; }; }) => {
          this.categories = res.categories.items
        }));

  }


  getArtist(query: string, access_token: string) {
    this._spotifyService.searchMusic(query, 'artist', access_token).subscribe(
      (res: { artists: { items: Artist[]; }; }) => {
        this.limitArtists = 4;
        this.artists = res.artists.items
      });
  }

  getAlbums(query: string, access_token: string) {
    this._spotifyService.searchMusic(query, 'album', access_token).subscribe(
      (res: { albums: { items: Album[]; }; }) => {
        this.limitAlbums = 4;
        this.albums = res.albums.items
      });
  }
  getPlaylists(query: string, access_token: string) {
    this._spotifyService.searchMusic(query, 'playlist', access_token).subscribe(
      (res: { playlists: { items: Playlist[]; }; }) => {
        this.limitPlaylists = 4;
        this.playlists = res.playlists.items
      });
  }

  clearQuery() {
    this.showCategory = true;
    this.query.reset();
  }

}

