import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post } from '../services/post.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  url_site_img : string;
  limit : number = 10;
  start : number = 0;
  id: number;
  total_itens : number = 0;
  cpf : string;

  lista: any = [];
  constructor(private provider: Post, public toast: ToastController, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
    this.id = data.id;
    });
  }

  logout() {

  }

  ionViewWillEnter() {
    this.listarProdutos();
  }


  listarProdutos() {
    return new Promise(resolve => {

      let dados = {
        requisicao: 'listar-produtos',
        limit : this.limit,
        start : this.start,
        id_cat :this.id, 

      };

      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {

        if (data['result'] == '0') {
          this.ionViewWillEnter();
        } else {
          this.lista = [];
          for (let item of data['result']) {
            this.lista.push(item);
            // this.total_itens = data['total'];

          }
        }

        resolve(true);

      });

    });
}

}