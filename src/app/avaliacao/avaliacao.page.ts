import { Post } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {


  condition:number[] = [4,4,4,4,4];

 
  list: any[] = new Array(5);

  teste : string;
  comentario: string;
  input : any;
 

  

  constructor(private storage: NativeStorage, private actRouter: ActivatedRoute, private router: Router, private provider: Post, public alert: AlertController, public toast: ToastController) { }

  ngOnInit() {

  }

  logout() {
    //this.storage.clear();
    this.router.navigate(['/login']);
  }

  voltar() {
    //this.storage.clear();
    this.router.navigate(['/produtos']);
  }

  finalizar() {  
    this.alertAval();
   
    this.router.navigate(['/produtos']);
  
    console.log("app-nota: " + this.condition[1]);
    console.log("produto-nota: " + this.condition[2]);
    console.log("preço-nota: " + this.condition[3]);
    console.log("espera-nota: " + this.condition[4]);
  
  }

  //---------------------------------------------------------------


  review1(i) {
    this.condition[1] = i + 1;
  }
  review2(i) {   
    this.condition[2] = i + 1;
  }
  review3(i) {  
    this.condition[3] = i + 1;
  }
  review4(i) { 
    this.condition[4] = i + 1;
  }
  

  async alertAval() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Resultado avaliação',
      subHeader: 'Protocolo: ' + this.teste,
      message:

      'Nota do aplicativo:' + this.condition[1] +
      '   /   Nota do produto:' + this.condition[2] +
      '   /   Nota do preço:' + this.condition[3] +
      '   /   Nota da espera:' + this.condition[4] +
      '   /   Comentário: ' + this.comentario,


       buttons: ['OK']
    });

    await alert.present();
    this.teste = '';
    this.comentario = '';
  }

  updateTest(input){

    this.teste = input
    return this.teste;
  }

  function(user) {
    console.log(user.word);

  };

}
