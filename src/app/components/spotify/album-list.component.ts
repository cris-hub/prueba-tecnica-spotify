import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Album } from '../../services/album-interface';
import { FilterService } from '../../services/filter.service';
import { PaginacionModel } from '../../modelo/PaginacionModel';

@Component({
  selector: 'album-list',
  template: `
  <app-limite-busqueda 
  (click)="paginacion.emit(true)">
  
  </app-limite-busqueda>

  <table class="table table-sm table-hover">
  <tr class="">
  </tr>
  

      <div class="grid">
        <album-list-item
          *ngFor="let album of albums
          | paginate: { itemsPerPage: filterService.paginacion.CantidadRegistros, currentPage: filterService.paginacion.PaginaActual, totalItems: filterService.paginacion.TotalRegistros, id: 'product'}
   
         "
          [album]="album"
          [active]="activeAlbum?.id === album.id"
          (click)="itemClick.emit(album)"></album-list-item>
      </div>
      </table>

  <app-pagination  (click)="paginacion.emit(true)" ></app-pagination>
  `,
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  ngOnInit(): void {
   this.filterService.paginacion = new PaginacionModel(1,10)
  }
  @Input() albums: Array<Album>;
  @Input() activeAlbum: Album;
  @Output() itemClick: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() paginacion: EventEmitter<Album> = new EventEmitter<Album>();
  constructor(
    public filterService : FilterService
  ){}
} 
