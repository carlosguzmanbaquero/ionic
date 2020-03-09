import { Component,OnInit } from '@angular/core';
import { ProyectoMusicService } from '../services/proyecto-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

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

  constructor(private musicService: ProyectoMusicService,
    private modalController:ModalController){}

  ionViewDidEnter(){
    this.musicService.getNewReleases().then((newReleases) =>{
      this.artists=this.musicService.getArtists();//newReleases.albums.items;
      //console.log(this.artists);
      this.songs=newReleases.albums.items.filter(e=>e.album_type=='single');
      this.albums=newReleases.albums.items.filter(e=>e.album_type=='album');
    });
  } 

  async showSongs(artist){
     const songs=await this.musicService.getArtistTopTrack(artist.id);
     const modal=await this.modalController.create({
       component: SongsModalPage,
       componentProps:{
         songs:songs.tracks,
         artist:artist.name
       }
     });
     return await modal.present();
  }

  ngOnInit() {
  }
}
