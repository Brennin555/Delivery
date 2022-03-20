import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Post } from '../services/post.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  lista: any = [];
  constructor(private provider: Post, public toast: ToastController) { }

  ngOnInit() {
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

