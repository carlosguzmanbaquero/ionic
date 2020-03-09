import { Component,OnInit } from '@angular/core';
import { ProyectoMusicService } from '../services/proyecto-music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  slideOpt ={
    initialSlide:2,
    slidesPerView:4,
    centeredSlides: true,
    speed:400
  }

  songs:any[]=[];
  albums:any[]=[];
  artists:any[]=[];

  constructor(private musicService: ProyectoMusicService){}

  ionViewDidEnter(){
    this.musicService.getNewReleases().then((newReleases) =>{
      this.artists=this.musicService.getArtists();//newReleases.albums.items;
      console.log(this.artists);
      this.songs=newReleases.albums.items.filter(e=>e.album_type=='single');
      this.albums=newReleases.albums.items.filter(e=>e.album_type=='album');
    });
  } 

  showSongs(artist){
     
  }

  ngOnInit() {
  }
}
