import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Album, Track } from '../../services/album-interface';
import { Subscription } from 'rxjs';
import { SpotifyAudioService } from '../../services/spotify-audio.service';
import { SpotifyAPIService } from '../../services/spotify-api.service';
import { FilterService } from '../../services/filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'artista',
  template: `
    <div class="modal-content">
      <a class="artist-name" *ngIf="album" 
        [href]="album.artists[0].external_urls.spotify"
        target="_blank">
          {{album.artists[0].name}}
      </a>
    
      <div class="tracks-list" *ngIf="tracks">
      
      <div class="track" *ngFor="let tr of tracks; let i = index">
         
          <div class="track" *ngFor="let t of tr.items; let i = index"
            (click)="playTrack(t)"
            [style.color]="t.id === track?.id ? 'orange' : null"
            >
            <img 
            [src]="tr.album.images[2].url" 
            class="cover"
            >
            {{t.name}} - duració{{t.duration_ms | secsToTime: true}} - album :{{tr.album.name}}
          </div>

          </div>
       </div>

        
       <i class="remove circle icon close-button" routerLink="/lanzamiento"
       ></i>
    </div>
  `,
  styleUrls: ['./artista.component.css']

})
export class ArtistaComponent implements OnInit {



  artist = '';
  albums: Album[];
  album: Album = null;
  track: Track = null;
  public tracks: Track[] = [];
  spotifyAudioSubscription: Subscription;

  constructor(
    public spotifyAudio: SpotifyAudioService,
    public spotifyAPI: SpotifyAPIService,
    public filterService: FilterService,
    private route: ActivatedRoute,
    private activedRoute: ActivatedRoute,

  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(response => {
      debugger
      if (Object.getOwnPropertyNames(response).length > 0) {
        this.findArstist(this.obtenerParametrosRuta().get('artista'))
      }
    })
    this.spotifyAudioSubscription = this.spotifyAudio.ended$.subscribe(() => this.album = null)
  }

  obtenerParametrosRuta(): Map<string, string> {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('artista', this.activedRoute.snapshot.paramMap.get('id'));
    return parametrosUlrMap;
  }


  searchAlbums(author: string) {
    this.spotifyAPI.searchAlbums(author)
      .subscribe(res => this.albums = res.albums.items)
  }

  findArstist(id: string) {
    this.spotifyAPI.findArstist(id)
      .subscribe(res => {
        this.album = res.items[0]
        this.albums = res.items
        this.albums.forEach(alb => {
          this.spotifyAPI.findAlbum(alb.id).subscribe(album => {
            console.log(album)
            album.album = alb;
            this.tracks.push(album)
          })
        })

      })
  }

  playTrack(track: Track) {
    if (this.track && this.track.id === track.id) { return; }
    this.track = track;
    this.spotifyAudio.playAudioTrack(track.preview_url)
  }
}
