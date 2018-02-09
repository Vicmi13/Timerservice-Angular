import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { Component, EventEmitter, Input, OnDestroy, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{
  
  ngOnChanges(changes): void {
    console.log('init value updated to:', changes.init.currentValue);
    this.startCountdown();
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy():void{
    this.clearTimeout();
  }

  @Output() onDecrement = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<number>();

  @Input() init:number = null;
  public counter: number =0;
  private countdownTimerRef: any = null;
  constructor() { }

  startCountdown(){
    if(this.init &&  this.init > 0){
      this.clearTimeout();
      this.counter = this.init;
      this.doCountDown();
    }
  }

  doCountDown(){
    this.countdownTimerRef = setTimeout( () => {
      this.counter = this.counter -1;
      this.processCount(); 
    }, 1000 );
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout( this.countdownTimerRef );
      this.countdownTimerRef = null;
    }
  }

  processCount(){
      this.onDecrement.emit(this.counter);
      console.log('la cuenta es', this.counter);
      if(this.counter == 0){
        this.onComplete.emit();
        console.log('La cuenta ha llegado a 0');
      }else{
        this.doCountDown();
      }
  }

}
