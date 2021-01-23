import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { spotImage } from 'src/app/models/image.model';
import { Playlist } from 'src/app/models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
  providers: [SpotifyService],
})
export class PlaylistComponent implements OnInit {

  id: string;
  playlist: Playlist;
  displayedColumns: any[]  =['title','album','dateAdded','dur','action'];
  trackDS:object[]=[];
  tableDataSrc:object[]=[];
  likedIds:object;
  playlistName: FormControl = new FormControl();

  constructor(
    private _route: ActivatedRoute, private _spotifyService: SpotifyService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    var likedIds =JSON.parse(localStorage.getItem("liked_ids"));
    this.likedIds = likedIds ||{};
    this.id = this._route.params._value['id'];
    if(this.id){
      this.getPlaylist();
      
    }else{
      this.getMyPlaylist();
    }
    
  }

  getPlaylist() {
    this._spotifyService.getAuth()
      .subscribe(res => this._spotifyService.getPlaylist(res.access_token, this.id)
        .subscribe(playlist => {
          this.playlist = playlist;
          var thet =this;
          var thisLikedIds=this.likedIds;
          var i=1;


          playlist.tracks.items.forEach(function (item) {
            let trackObj:object={};
            trackObj['trackNumber'] =i;
            trackObj['artist'] =item.track.artists.length?item.track.artists[0].name:'NA';
            trackObj['name'] =item.track.name;
            trackObj['album'] =item.track.album.name;
            trackObj['img'] =item.track.album.images.length?item.track.album.images[0].url:"";
            trackObj['dur'] =item.track.duration_ms;
            trackObj['dateAdded'] =item.added_at;
            trackObj["id"] =item.track.id;
            thet.setLike(trackObj);
            i++;
            thet.trackDS.push(trackObj);
          }); 
         
        })
        
      );
      

  }

  getMyPlaylist() {
   
    let myPlaylist:Playlist;
    myPlaylist=JSON.parse(localStorage.getItem('my_playlist'));
    if(myPlaylist){
      this.playlist =myPlaylist;
      this.trackDS = this.playlist.items;
    }else{
      myPlaylist =new Playlist();
      myPlaylist.name ="My Playlist";
      myPlaylist.description ="Get from localStorage";
      myPlaylist.images=[];
      let myImage =new spotImage();
      myImage.url="https://i.scdn.co/image/ab67706f000000030f58bd119b33df09d2092005";
      myPlaylist.images.push(myImage);
      myPlaylist.items=[];
      myPlaylist.isEditbale =true;
      this.playlist =myPlaylist;
      this.tableDataSrc = this.playlist.items;
      localStorage.setItem("my_playlist",JSON.stringify(myPlaylist));
    }
    this.playlistName.value =this.playlist.name;

    this.playlistName.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
      .subscribe(query =>{
        if(query!=""){
          this.playlist.name=query;
          localStorage.setItem("my_playlist",JSON.stringify(this.playlist));
        }

      });   

  }

  setLike(trackObj:object){
    if(this.likedIds[trackObj["id"]]){
      trackObj['likedIcon']="done_all";
      trackObj['isLiked']=true;
    }else{
      trackObj['likedIcon']="done";
      trackObj['isLiked']=false;
    }

  }

  likeClick(item){
    debugger;
    if(item.isLiked){
      item.likedIcon="done"
      delete(this.likedIds[item.id]);

    }else{
      this.likedIds[item.id]=true;;
      item.likedIcon="done_all"
    }
    item.isLiked=!item.isLiked;
    localStorage.setItem("liked_ids" ,JSON.stringify(this.likedIds));
  }

  addToMyPlaylistClick(item){
    let myPlaylist:Playlist;
    myPlaylist=JSON.parse(localStorage.getItem('my_playlist'));
    var pos = myPlaylist.items.map(function(e) { return e.id; }).indexOf(item.id);
    if(pos<0){
      myPlaylist.items.push(item);
    }
   
    localStorage.setItem("my_playlist",JSON.stringify(myPlaylist));
  };

  removeFromMyPlaylist(item){
    var pos = this.playlist.items.map(function(e) { return e.id; }).indexOf(item.id);
    if(pos>=0){
      this.playlist.items.splice(pos,1);
    }
    localStorage.setItem("my_playlist",JSON.stringify(this.playlist));
    this.trackDS = this.playlist.items;
    this.refresh();
    
  }
 
  refresh(){
    this.getMyPlaylist();
    this.changeDetectorRefs.detectChanges();
  }
}
