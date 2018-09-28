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
      
      <div class="album-name"  *ngIf="album" >{{album.name}}</div>
            
      <div class="tracks-list" *ngIf="album">
      <div class="tracks-list" *ngIf="album.tracks">
          
          <div class="track" *ngFor="let t of album.tracks.items; let i = index"
            (click)="trackClick.emit(t)"
            [style.color]="t.id === track?.id ? 'orange' : null"
            >
            {{i+1}}. {{t.name}} - {{t.duration_ms | secsToTime: true}} 
          </div>
          </div>

      </div>
        
       <i class="remove circle icon close-button" routerLink="/lanzamiento"
       ></i>
    </div>
  `,
  styleUrls: ['./track-list.component.css']

})
export class ArtistaComponent implements OnInit {



  artist = '';
  albums: Album[];
  album: Album = null;
  track: Track =null;
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
      if (Object.getOwnPropertyNames(response).length > 0){
        this.findArstist(this.obtenerParametrosRuta().get('artista'))
      }
    })
    this.spotifyAudioSubscription = this.spotifyAudio.ended$.subscribe(() => this.album = null)
  }

  obtenerParametrosRuta() : Map<string,string> {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('artista', this.activedRoute.snapshot.paramMap.get('id'));
    return parametrosUlrMap;
}

  findArstist(id: string) {
    this.spotifyAPI.findArstist(id)
      .subscribe(res =>  {
        debugger
        this.album =  res.items[0]
        this.albums = res.items })
  }
}
