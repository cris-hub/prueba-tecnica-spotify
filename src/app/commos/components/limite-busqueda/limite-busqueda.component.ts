import { Component, OnInit } from '@angular/core';
import { PaginacionModel } from '../../../modelo/PaginacionModel';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-limite-busqueda',
  templateUrl: './limite-busqueda.component.html',
  styleUrls: ['./limite-busqueda.component.css']
})
export class LimiteBusquedaComponent implements OnInit {
  constructor(public filterService:FilterService) { }

  ngOnInit() {
  }

  limiteConsulta(event: any) {
    console.log(event)
    this.filterService.paginacion = new PaginacionModel(1, event);
  }
}
