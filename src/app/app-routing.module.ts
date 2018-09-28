import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginReolver } from './resolvers/loging-resolver';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { ArtistaComponent } from './components/spotify/artista.component';


const routes: Routes = [

  //Common
  { path: '', redirectTo: '/lanzamiento', pathMatch: 'full' },
  { path: 'lanzamiento', component: SpotifyComponent  ,resolve : {data : LoginReolver}},
  { path: 'artista/:id', component: ArtistaComponent  ,resolve : {data : LoginReolver}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
