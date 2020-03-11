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
  song={};
  currentSong={};
  newTime={};

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
     //console.log('artista '+artist.id);
     const modal=await this.modalController.create({
       component: SongsModalPage,
       componentProps:{
         songs:songs.tracks,
         artist:artist.name
       }
     });

     modal.onDidDismiss().then(dataReturned=>{
      this.song=dataReturned.data;
     });

     return await modal.present();
  }

  async showSongsAlbum(album){
    const songs=await this.musicService.getAlbumTrack(album.id);
    //console.log('album '+album.id);
    const modal=await this.modalController.create({
      component: SongsModalPage,
      componentProps:{
        songs:songs.items,
        artist:album.name
      }
    });

    modal.onDidDismiss().then(dataReturned=>{
      this.song=dataReturned.data;
     });

     return await modal.present();
  }

  play(){
    this.song.playing=true;
    this.currentSong=new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate",() =>{
      this.newTime= (this.currentSong.currentTime*(this.currentSong.duration/10))/100;
    });
  }

  pause(){
    this.song.playing=false;
    this.currentSong.pause();
  }

  parseTime(time="0.00"){
    if(time){
      const parTime=parseInt(time.toString().split(".")[0],10);
      let minutes=Math.floor(parTime/60).toString();
      if(minutes.length==1){
        minutes="0"+minutes;
      } 
      let seconds=Math.floor(parTime%60).toString();
      if(seconds.length==1){
        seconds="0"+seconds;
      }
      return minutes+":"+seconds;
    }
  }

  ngOnInit() {
  }
}
