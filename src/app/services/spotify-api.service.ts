import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FilterService } from './filter.service';

@Injectable()
export class SpotifyAPIService {
  client_id = "f2b1643273144e33931ae0a50836ff09";
  client_secret = "7748ff6ae88546719443acdf4fdfeb9f";

  private accessToken: any;
  private tokenType: string;

  constructor(private http: Http,private filterService : FilterService) { }

  login() {
    // let authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    let authorizationTokenUrl = `/api/token`;
debugger
    let header = new Headers();
    header.append('Authorization', 'Basic  ' + btoa(this.client_id + ':' + this.client_secret));
    header.append('Content-Type', 'application/x-www-form-urlencoded;');

    let options = new RequestOptions({ headers: header });
    let body = 'grant_type=client_credentials';


    return this.http.post(authorizationTokenUrl, body, options)
      .map(data => data.json())
      .do(token => {
        debugger
        this.accessToken = token.access_token;
        this.tokenType = token.token_type;
      }, error => console.log(error));
  }

  searchAlbums(title: string) {
    const options = this.getOptions();
    return this.http.get(`https://api.spotify.com/v1/search?query=${title}&type=album`, options)
      .map(res => res.json())
      .publishLast()
      .refCount()
  }

  getListofNewReleases(){
    const options = this.getOptions();
    console.log(this.filterService.paginacion)
    return this.http.get(`
    https://api.spotify.com/v1/browse/new-releases?limit=${
      this.filterService.paginacion.CantidadRegistros
    }&offset=${
      this.filterService.paginacion.PaginaActual*this.filterService.paginacion.CantidadRegistros
    }`
    , options)
      .map(res => res.json())
      .publishLast()
      .refCount()
  }

  loadAlbum(id) {
    const options = this.getOptions();
    return this.http.get(`https://api.spotify.com/v1/albums/${id}`, options)
      .map(res => res.json())
      .publishLast()
      .refCount()
  }


  private getOptions() {
    console.log(this.accessToken);
    console.log(this.tokenType);
debugger
    let header = new Headers();
    header.append('Authorization', this.tokenType + ' ' + this.accessToken);
    let options = new RequestOptions({ headers: header });

    return options;
  }
}