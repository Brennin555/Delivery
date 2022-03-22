import { ToastController } from '@ionic/angular';
import { Post } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuario : string = "";
  senha : string = "";


  nome : string = "";
  
  telefone : string = "";
  cpf : string = "";
  rua : string = "";
  numero : string = "";
  bairro : string = "";
  cidade : string = "";
  cep : string = "";

  lista : any = [];

  constructor(private storage: NativeStorage, private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toastController: ToastController) { }

  
 
  
  ngOnInit() {
    
  }

    
  ionViewWillEnter(){
    this.lista = [];
   
    this.listarLocais();
   
  }


  async mensagemSalvar(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1000
    });
    toast.present();
  }



  login(){
    this.router.navigate(['/login']);
  }


  cadastro(){
    return new Promise(resolve => {
        
      let dados = {
        requisicao : 'add',
        nome : this.nome, 
        rua : this.rua, 
        telefone : this.telefone, 
        usuario : this.usuario, 
        numero : this.numero, 
        cpf : this.cpf, 
        bairro : this.bairro,
        cidade : this.cidade,
        senha : this.senha,
        cep : this.cep,
        };
  
        this.provider.dadosApi(dados, 'apiLogin.php').subscribe(data => {
          
          
            this.mensagemSalvar(data['result']);
            if(data['result'] == 'Salvo com Sucesso!'){
              this.router.navigate(['/login']);
            }
          
        });
    });
  }



  
  listarLocais(){
    return new Promise(resolve => {

    let dados = {
      requisicao : 'listar-locais',
     
      };

      this.provider.dadosApi(dados, 'apiLogin.php').subscribe(data => {

        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          this.lista = [];
          for(let item of data['result']){
            this.lista.push(item);
                        
          }
        }
         
        resolve(true);
        
    });

  });
    
  }

}
