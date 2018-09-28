import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'album-list-item',
  template: `
  <div>
      <img 
        [src]="album.images[0].url" 
        class="cover"
        [ngClass]="{playing: active}"
        >
        <label>Artistas:</label>
        <ul *ngFor="let artista of album.artists" >
        <li> <button class="ui primary button" [routerLink]="'/artista/'+artista.id" >{{artista.name}}</button> </li>
        </ul>
        <label>lanzamiento:</label>
        <p> {{album.release_date}}</p>
        <label>{{album.album_type =='album' ? 'album:':'nombre :'  }}</label>
        <p> {{album.name}}</p>
        </div> 
  `,
  styleUrls: ['./album-list-item.component.css']
})
export class AlbumListItemComponent {
  @Input() active: boolean;
  @Input() album: any;
  @HostBinding() className = 'cell';
}
