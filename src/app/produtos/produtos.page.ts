import { Post } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {


  lista : any = [];
  url_site_img : string;
  limit : number = 10;
  start : number = 0;
  id: number;
  total_itens : number = 0;
  cpf : string;

  total_carrinho : string;
  dadosLogin : any;
  constructor(private storage: NativeStorage, private actRouter: ActivatedRoute, private router: Router, private provider:Post, public toast: ToastController) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
     
    });
  }

  logout(){
    //this.storage.clear();
    this.router.navigate(['/login']);
  }

  
  ionViewWillEnter(){

    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
    //  this.cpf = this.dadosLogin.cpf;
     
      
    }); 
    this.cpf = '123.321.123-13';


    this.lista = [];
    this.start = 0;   
    this.listarProdutos();
    this.listarCarrinho();
    this.url_site_img = this.provider.url_site_img_produtos; 
  }




  listarProdutos(){
    return new Promise(resolve => {

    let dados = {
      requisicao : 'listar-produtos',
      limit : this.limit,
      start : this.start,
      id_cat :this.id, 
      };

      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {

        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          this.lista = [];
          for(let item of data['result']){
            this.lista.push(item);
            this.total_itens = data['total'];
            
          }
        }
         
        resolve(true);
        
    });

  });
    
  }



  categorias(){
    this.router.navigate(['/categorias']);
  }


  //barra de rolagem
loadData(event) {

  this.start += this.limit;

  setTimeout(() => {
    this.listarProdutos().then(()=>{ 
      event.target.complete();
     });
   
  }, 3000);
  

}



async mensagemSalvar() {
  const toast = await this.toast.create({
    message: 'Adicionado ao Carinho!',
    position: 'middle',
    duration: 500,
    color: 'success',
  });
  toast.present();
}


async mensagemLogar() {
  const toast = await this.toast.create({
    message: 'Você precisa estar logado! Faça Login ou Cadastre-se!',
    position: 'middle',
    duration: 4000,
    color: 'danger'
  });
  toast.present();
}


addCarrinho(id){
  if(this.cpf === undefined){
    this.mensagemLogar();
    this.router.navigate(['/login']);
    console.log(this.cpf);
    return;
  }
  return new Promise(resolve => {
        
    let dados = {
      requisicao : 'add-carrinho',
      id_produto : id, 
      cpf : this.cpf, 
      
      };

      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
               
          this.mensagemSalvar();
          this.listarCarrinho();
                  
      });
  });
}




listarCarrinho(){
  return new Promise(resolve => {

  let dados = {
    requisicao : 'listar-carrinho',
    cpf :this.cpf, 
    };

    this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {

        
          this.total_carrinho = data['total'];
         
             
      resolve(true);
      
  });

});
  
}




carrinhoPage(){
  this.router.navigate(['/carrinho']);
}


}