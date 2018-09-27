import { Component, OnInit } from '@angular/core';
import { PaginacionModel } from '../../../modelo/PaginacionModel';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  public paginacion : PaginacionModel

  constructor(public filterService : FilterService) { }

  ngOnInit() {
  }

  cambioPagina(page: any) {
    this.filterService.paginacion.PaginaActual = page;
  }
}
