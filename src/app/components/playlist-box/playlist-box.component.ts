import { Component, OnInit,Input } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';

@Component({
  selector: 'app-playlist-box',
  templateUrl: './playlist-box.component.html',
  styleUrls: ['./playlist-box.component.less']
})
export class PlaylistBoxComponent implements OnInit {
  @Input() playlist: Playlist;
  @Input() config:any;

  _playlist:Playlist;
  show:boolean=false;
  path:string;
  constructor() {
  
   }

  ngOnInit(): void {
    if(this.playlist){
      this._playlist=this.playlist;
      this.path=this.config.path+this.playlist.id;
      this.show=true;
     }
  }

}
