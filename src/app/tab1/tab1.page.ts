import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pokemons: Pokemon[];
  savedPokemons: any;
  offset = 0;
  step: number;
  nbPokemons: number;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private storageService: StorageService
  ) {
    router.events.subscribe((event: NavigationEvent) => {
      if (
        event instanceof NavigationStart &&
        this.savedPokemons !== undefined
      ) {
        this.navEvent();
      }
    });
  }

  async navEvent() {
    let newSavedPokemons = [];
    await this.storageService.get('favorites').then((data) => {
      if (data) {
        newSavedPokemons = data;
      }
    });
    console.log('old: ', this.savedPokemons);
    console.log('new: ', newSavedPokemons);
    // update bookmarks if changed
    for (const savedPokemon of this.savedPokemons) {
      let isModified = true;
      for (const newSavedPokemon of newSavedPokemons) {
        if (savedPokemon.id === newSavedPokemon.id) {
          isModified = false;
          break;
        }
      }
      // if not in favorites anymore then search if it's visible on screen
      if (isModified && savedPokemon.id <= this.step + this.offset) {
        console.log(savedPokemon.name);
        this.pokemons[savedPokemon.id - 1].setIsBookmarked(false);
      }
    }
  }

  async ngOnInit() {
    this.step = 20;
    this.pokemons = await this.apiService.getPokemons(this.offset, this.step);
    this.offset += this.step;
    this.nbPokemons = this.apiService.getNumberOfPokemons();
    await this.storageService.get('favorites').then(
      (data) => {
        if (data) {
          this.savedPokemons = data;
        } else {
          this.savedPokemons = [];
        }
      },
      () => (this.savedPokemons = [])
    );
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
    this.pokemons = this.pokemons.concat(
      await this.apiService.getPokemons(this.offset, this.step)
    );
    this.offset += this.step;
  }

  details(id: number) {
    this.router.navigate(['details/', id]);
  }

  async addToFavorites(id: number) {
    // TODO: ajouter un toast
    const pkm: Pokemon = this.pokemons[id - 1];
    await this.storageService.get('favorites').then(
      (data) => {
        if (data) {
          this.savedPokemons = data;
        } else {
          this.savedPokemons = [];
        }
      },
      () => (this.savedPokemons = [])
    );
    if (!pkm.getIsBookmarked()) {
      this.savedPokemons.push(pkm);
    } else {
      for (let counter = 0; counter < this.savedPokemons.length; counter++) {
        if (this.savedPokemons[counter].id === id) {
          if (this.savedPokemons.length === 1) {
            this.savedPokemons = [];
          } else {
            this.savedPokemons.splice(counter, 1);
          }
          break;
        }
      }
    }
    this.storageService.set('favorites', this.savedPokemons);
    pkm.setIsBookmarked(!pkm.getIsBookmarked());
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
