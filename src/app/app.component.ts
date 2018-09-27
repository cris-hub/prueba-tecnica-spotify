import { Http } from '@angular/http';
// Original Source Code (jquery/handlebar)
// http://jsfiddle.net/JMPerez/0u0v7e1b/

import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { SpotifyAudioService } from './services/spotify-audio.service';
import { SpotifyAPIService } from './services/spotify-api.service';
import { Subscription } from 'rxjs';
import { Album, Track } from './services/album-interface';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-root',
  template: `
     <div class="container">
      <h1>Spotify Player</h1>

      <form-filter
        [text]="artist"
        (search)="searchAlbums($event)"></form-filter>    
     
      <album-list
        [albums]="albums"
        [activeAlbum]="album"
        (paginacion)="GetListofNewReleases($event)"
        (itemClick)="playAlbum($event)"></album-list>
        
       <tracks-list 
         *ngIf="album"
         [album]="album"
         [track]="track"
         (trackClick)="playTrack($event)"
         (close)="closeModal()"></tracks-list>
    </div>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements  OnInit,OnDestroy {
  ngOnInit(): void {
    this.spotifyAPI.login()
    .subscribe(() => {
      this.GetListofNewReleases();
    });

  this.spotifyAudioSubscription = this.spotifyAudio.ended$.subscribe(() => this.album = null )
  }
  artist = '';
  albums: Album[];
  album: Album;
  track: Track;
  spotifyAudioSubscription: Subscription;

  constructor(
    public spotifyAudio: SpotifyAudioService,
    public spotifyAPI: SpotifyAPIService,
    public filterService : FilterService
  ) {
  
  }

  GetListofNewReleases(paginacion?){
    
    this.spotifyAPI.getListofNewReleases()
    .subscribe(res => {
      this.albums = res.albums.items
    this.filterService.paginacion.TotalRegistros = res.albums.total
    console.log( this.filterService.paginacion)
    })
  }

  searchAlbums(author: string) {
    this.spotifyAPI.searchAlbums(author)
      .subscribe(res => this.albums = res.albums.items)
  }

  playAlbum(nextAlbum: Album) {
    this.spotifyAPI.loadAlbum(nextAlbum.id)
      .subscribe(album => {
        this.album = album;
        this.playTrack(album.tracks.items[0])
      })
  }

  playTrack(track: Track) {
    if (this.track && this.track.id === track.id) { return; }
    this.track = track;
    this.spotifyAudio.playAudioTrack(track.preview_url)
  }

  closeModal() {
    this.album = null;
    this.track = null;
    this.spotifyAudio.pauseTrack();
  }

  ngOnDestroy() {
    this.spotifyAudioSubscription.unsubscribe();
    this.spotifyAudio.destroy();
  }
}
