import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from './counter.action'

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  standalone : true
})
export class CounterComponent {

  /**
   *
   */
  constructor(private store: Store<{counter : number}>) {

    console.log('CounterComponent');
      
    const x = this.store.select('counter');
    x.subscribe( (data) => {
      console.log(data);
    })
  }

  increment(){
    this.store.dispatch( increment() )
  }

  decrement(){
    this.store.dispatch( decrement() )
  }

  reset(){
    this.store.dispatch( reset() )
  }

}
