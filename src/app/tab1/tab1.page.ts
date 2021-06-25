import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pokemons: Pokemon[];
  offset = 0;
  step: number;
  nbPokemons: number;

  constructor(public router: Router, private apiService: ApiService) {}

  async ngOnInit() {
    this.step = 20;
    this.pokemons = await this.apiService.getPokemons(this.offset, this.step);
    this.offset += this.step;
    this.nbPokemons = this.apiService.getNumberOfPokemons();
  }

  async loadData(event) {
    setTimeout(() => {
      if (this.offset + this.step <= this.nbPokemons) {
        this.getData();
        console.log('Refresh');
        event.target.complete();
      } else {
        this.toggleInfiniteScroll();
      }
    }, 500);
  }

  async getData() {
    this.pokemons = this.pokemons.concat(await this.apiService.getPokemons(this.offset, this.step));
    this.offset += this.step;
  }

  details(id: number) {
      this.router.navigate(['details/', id]);
  }

  addToFavorites(id: number) {
      // TODO: ajouter un toast + ajouter dans le storage
     const pkm: Pokemon = this.pokemons[id-1];
     pkm.setIsBookmarked(!pkm.getIsBookmarked());
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
