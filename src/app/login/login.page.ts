import { ToastController, AlertController } from '@ionic/angular';
import { Post } from './../services/post.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
//import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario : string = "";
  senha : string = "";


 

  constructor(
    private storage: NativeStorage,
    public alertController: AlertController,  private router:Router, private provider:Post, public toast: ToastController) { }

  ngOnInit() {
  }

  async login(){
    if(this.usuario == ""){
      const toast = await this.toast.create({
        message: 'Preencha o Usuário',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    if(this.senha == ""){
      const toast = await this.toast.create({
        message: 'Preencha a Senha',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }


    let dados = {
      requisicao : 'login',
      usuario : this.usuario, 
      senha : this.senha
      
      };

      this.provider.dadosApi(dados, 'apiLogin.php').subscribe(async data => {
      var alert = data['msg'];
      if(data['success']) {
        this.storage.setItem('session_storage', data['result']);
        
          this.router.navigate([ '/produtos']);
                
        const toast = await this.toast.create({
          message: 'Logado com Sucesso!!',
          duration: 1000,
          color: 'success'
        });
        toast.present();
        this.usuario = "";
        this.senha = "";
        console.log(data);
      }else{
        const toast = await this.toast.create({
          message: alert,
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
       
               
      });



}



cadastro(){
  this.router.navigate([ '/cadastro']);
}

async recuperarModal(){
  const alert = await this.alertController.create({
    header: 'Recuperar Email!',
    inputs: [
      {
        name: 'email',
        type: 'text',
        placeholder: 'Insira seu Email',
        //value: this.usuario
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
         
         this.usuario = data.email;
         console.log(this.usuario);
         this.recuperar();
        }
      }
    ]
  });

  await alert.present();
}




async mensagemSalvar(msg) {
  const toast = await this.toast.create({
    message: msg,
    duration: 1000
  });
  toast.present();
}



recuperar(){
  return new Promise(resolve => {
        
    let dados = {
      requisicao : 'recuperar',
      usuario : this.usuario,
      };

      this.provider.dadosApi(dados, 'apiLogin.php').subscribe(data => {
        
        
          this.mensagemSalvar(data['result']);
         
        
      });
  });
}


}
