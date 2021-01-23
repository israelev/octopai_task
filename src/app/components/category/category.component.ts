import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
  providers: [SpotifyService],
})
export class CategoryComponent implements OnInit {
  id: string;
  playlists: Playlist[];
  limitPlaylists=4;
  playlistConfig:object;
  constructor(
    private _route: ActivatedRoute,private _spotifyService: SpotifyService) {
      this.playlistConfig ={
        "path":"../../playlist/",
         "showDescription":true,
         "type":"playlist"         
      }

     }
 
    ngOnInit(): void {
      this.id=this._route.params._value['id'];
      this.getCtegoryPlaylists();
  }

  getCtegoryPlaylists(){
    this._spotifyService.getAuth()
    .subscribe(res => this._spotifyService.getCategoryPlailists(res.access_token,this.id).subscribe(
      (res: { playlists: { items: Playlist[]; }; })=> {
        this.playlists = res.playlists.items
      }));

  }

}
