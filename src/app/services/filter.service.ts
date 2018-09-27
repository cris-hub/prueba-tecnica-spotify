// Inspired by the jquery/handlebar official web documentation samples:
// http://jsfiddle.net/JMPerez/0u0v7e1b/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginacionModel } from '../modelo/PaginacionModel';

@Injectable()
export class FilterService {

    public filter : string
    public order: string = 'name';
    public paginacion : PaginacionModel = new PaginacionModel(1,10)

}