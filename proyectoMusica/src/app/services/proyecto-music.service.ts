import { Injectable } from '@angular/core';
import * as dataArtists from "./artists.json";

@Injectable({
  providedIn: 'root'
})
export class ProyectoMusicService {

  constructor() {}

  getArtists(){
    return dataArtists.items; 
  }

  getNewReleases(){
    return fetch("https://platzi-music-api.now.sh/browse/new-releases").then(
      response => response.json()
    );
  }

  getArtistTopTrack(artistId){
    console.log(artistId);
    return fetch(`https://platzi-music-api.now.sh/artists/${artistId}/top-tracks?country=CO`).then(
      response => response.json()
    );
  }
}
