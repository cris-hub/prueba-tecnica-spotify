import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AlbumListItemComponent } from './components/spotify/album-list-item.component';
import { FormFilterComponent } from './components/form-filter/form-filter.component';
import { AlbumListComponent } from './components/spotify/album-list.component';
import { SpotifyAPIService } from './services/spotify-api.service';
import { TrackListComponent } from './components/spotify/track-list.component';
import { SecsToTimePipe } from './components/pipes/secstotime.pipe';
import { SpotifyAudioService } from './services/spotify-audio.service';
import { AppRoutingModule } from './app-routing.module';
import { PaginationComponent } from './commos/components/pagination/pagination.component';
import { LimiteBusquedaComponent } from './commos/components/limite-busqueda/limite-busqueda.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterService } from './services/filter.service';
import { OrderComponent } from './commos/components/order/order.component';
import { LoginReolver } from './resolvers/loging-resolver';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { ArtistaComponent } from './components/spotify/artista.component';

@NgModule({
  declarations: [
    // root
    AppComponent,
    // shared comps
    AlbumListItemComponent,
    FormFilterComponent,
    AlbumListComponent,
    TrackListComponent,
    SpotifyComponent,
    ArtistaComponent,
    // pipes
    SecsToTimePipe,
    PaginationComponent,
    LimiteBusquedaComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxPaginationModule,

  ],
  providers: [SpotifyAudioService, SpotifyAPIService, FilterService, LoginReolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
