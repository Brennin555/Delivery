import { Post } from './../services/post.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

//import {IonComponentComponent} from '../ion-component.component';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {

  @Input() numStars: number = 4;
  @Input() value: number = 1;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: string[] = []; 
  constructor(private storage: NativeStorage, private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toast: ToastController) { }

  ngOnInit() {
  }

  logout() {
    //this.storage.clear();
    this.router.navigate(['/login']);
  }

  finalizar() {
    this.router.navigate(['/produtos']);
    console.log("Deu tudo certo, avaliação realizada");
  }

//---------------------------------------------------------------

  ngAfterViewInit(){
    this.calc();
  }

  calc(){
    this.stars = [];
    let tmp = this.value;
    for(let i=0; i <= this.numStars; i++, tmp--){
      if(tmp>=1){
        this.stars.push("star");
      }
      else{
        this.stars.push("star-outline");
      }

    }
  }

  starClicked(index){
    console.log(index + 1);
    this.value = index + 1
    this.ionClick.emit(this.value);
  }

}
