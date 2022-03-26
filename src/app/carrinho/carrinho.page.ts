import { ToastController, AlertController } from '@ionic/angular';
import { Post } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  lista : any = [];
  url_site_img : string;
  limit : number = 10;
  start : number = 0;
  id: number;
 
  cpf : string;

  total_carrinho : string;
  total_itens : string;
  dadosLogin : any;

  frete : string;
  subtotal : string;
  subtotal2 : string;
  previsao: string;

  rua: string;
  numero: string;
  bairro: string;

  tipo: string;
  troco: string;
  obs: string;
  
  
  constructor(public alertController: AlertController, private storage: NativeStorage, private actRouter: ActivatedRoute, private router: Router, private provider:Post, public toast: ToastController) { }

  ngOnInit() {
    
  }

  logout(){
    //this.storage.clear();
    this.router.navigate(['/login']);
  }

  
  ionViewWillEnter(){

    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.cpf = this.dadosLogin.cpf;
     
      
    }); 
    this.cpf = '123.321.123-13';

    if(this.cpf === undefined){
      this.router.navigate(['/login']);
      this.mensagemLogar();
      return;
    }

    this.lista = [];
    this.start = 0;   
    this.listarCarrinho();
    this.url_site_img = this.provider.url_site_img_produtos; 
  }


  async mensagemLogar() {
    const toast = await this.toast.create({
      message: 'Você precisa estar logado! Faça Login ou Cadastre-se!',
      duration: 4000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }


  produtos(){
    this.router.navigate(['/produtos']);
  }




  //barra de rolagem
loadData(event) {

  this.start += this.limit;

  setTimeout(() => {
    this.listarCarrinho().then(()=>{ 
      event.target.complete();
     });
   
  }, 3000);
  

}



async mensagemSalvar(texto) {
  const toast = await this.toast.create({
    message: texto,
    duration: 3000,
    position: 'middle',
    color: 'success'
  });
  toast.present();
}






listarCarrinho(){

  this.listarClientes();

  return new Promise(resolve => {

  let dados = {
    requisicao : 'listar-carrinho',
    cpf :this.cpf, 
    };

    this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {

        
          
          if(data['result'] == '0') {
            this.ionViewWillEnter();
          }else{
            this.lista = [];
            for(let item of data['result']){
              this.lista.push(item);
              this.total_carrinho = data['total'];
              this.frete = data['frete'];
              this.subtotal = data['subtotal'];
              this.subtotal2 = data['subtotal2'];
              this.total_itens = data['totalItens'];
              this.previsao = data['previsao'];
            }
          }
         
             
      resolve(true);
      
  });

});
  
}


addItem(id){
  return new Promise(resolve => {
        
    let dados = {
      requisicao : 'add-item',
      id : id,
      cpf : this.cpf,
      };

      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
        
        
          this.mensagemSalvar('Item Adicionado!');
          this.listarCarrinho();
         
        
      });
  });
}


removeItem(id){
  return new Promise(resolve => {
        
    let dados = {
      requisicao : 'remove-item',
      id : id,
      cpf : this.cpf,
      };

      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
        
        
          this.mensagemSalvar('Item Removido!');
          this.listarCarrinho();
         
        
      });
  });
}



async finalizarModal(){

  
  
  const alert = await this.alertController.create({
    header: 'Finalizar Pedido!',
    message: 'Previsão ' + this.previsao + ' Minutos',
    backdropDismiss: false,
    inputs: [


      {
        name: 'tipo',
        type: 'text',
        placeholder: 'Cartão / Dinheiro',
        //value: this.usuario
      },

      {
        name: 'troco',
        type: 'number',
        placeholder: 'Valor para o Troco',
        //value: this.usuario
      },


      {
        name: 'rua',
        type: 'text',
        placeholder: 'Rua',
        value: this.rua
      },


      {
        name: 'numero',
        type: 'number',
        placeholder: 'Número',
        value: this.numero
      },

      {
        name: 'bairro',
        type: 'text',
        placeholder: 'Bairro',
        value: this.bairro
      },

      {
        name: 'obs',
        type: 'textarea',
        placeholder: 'Obs: Tirar o Picles, etc',
        
      },

         
      
    ],
    

    
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Enviar',
        handler: (data) => {
         //atualizar pag
         
         this.rua = data.rua;
         this.bairro = data.bairro;
         this.numero = data.numero;
         this.tipo = data.tipo;
         this.troco = data.troco;
         this.obs = data.obs;
         
         this.finalizar();
        }
      }
    ]
  });

  await alert.present();

}


finalizar(){
  return new Promise(resolve => {
        
    let dados = {
      requisicao : 'finalizar-pedido',
      cpf : this.cpf,
      rua : this.rua,
      numero : this.numero,
      bairro : this.bairro,
      obs : this.obs,
      troco : this.troco,
      tipo : this.tipo,
      total: this.subtotal,
      };

      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
        
        
          this.mensagemSalvar(data['texto']);
          this.router.navigate(['/produtos']);
         
        
      });
  });
}






listarClientes(){
  return new Promise(resolve => {

  let dados = {
    requisicao : 'listar-clientes',
    cpf :this.cpf, 
    };

    this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {

        
          
          if(data['result'] == '0') {
         //   this.ionViewWillEnter();
          }else{
           
           
              this.rua = data['rua'];
              this.numero = data['numero'];
              this.bairro = data['bairro'];
              
           
          }
         
             
      resolve(true);
      
  });

});
  
}

}
