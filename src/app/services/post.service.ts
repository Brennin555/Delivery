import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class Post{
    server: string = 'http://delivery.hugocursos.com.br/apis/';
    //url_site_img_produtos: string = 'http://delivery.hugocursos.com.br/images/produtos/';
    //url_site_img_cat: string = 'http://delivery.hugocursos.com.br/images/categorias/';

    constructor(private http : HttpClient){
       
    }


     dadosApi(dados: any, api: string){
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type' : 'application/json'})
                }

            let url = this.server + api;
            return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
        }
}
