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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
   <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {

}
