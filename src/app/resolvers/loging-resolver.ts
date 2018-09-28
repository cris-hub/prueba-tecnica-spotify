import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { SpotifyAPIService } from '../services/spotify-api.service';


@Injectable()
export class LoginReolver implements Resolve<Map<string, string>> {

    constructor(
        private router: Router,
        private spotyfyAPI: SpotifyAPIService,
        
    ) { }

    resolve(route: ActivatedRouteSnapshot): Promise<Map<string, string>> {
        let token: Map<string, string>


        return new Promise((resolve, reject) => {
            this.spotyfyAPI.login().toPromise()
                .then(res => {
                    if (!res) {
                        return null
                    }
                   return resolve(res)
                })
        })
    }
}
