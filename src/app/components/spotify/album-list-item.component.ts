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
        <label>Artista:</label>
        <p>{{album.artists[0].name}}</p>
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
