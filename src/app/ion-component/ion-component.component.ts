import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ion-component',
  templateUrl: './ion-component.component.html',
  styleUrls: ['./ion-component.component.scss'],
})
export class IonComponentComponent implements OnInit {

  @Input() numStars: number = 5;
  @Input() value: number = 2.5;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: string[] = []; 

  constructor() { }

  ngOnInit() {}

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
      else if(tmp > 0 && tmp < 1){
        this.stars.push("star-half");
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
