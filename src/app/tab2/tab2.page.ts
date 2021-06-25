import { Component, OnInit } from '@angular/core';
import {
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pokemons: any;

  constructor(public router: Router, private storageService: StorageService) {
    storageService = this.storageService;
    router.events.subscribe((event: NavigationEvent) => {
      // TODO: 2 calls instead of 1 (in and out) (same in tab1)
      if (event instanceof NavigationStart) {
        this.storageService.get('favorites').then((data) => {
            if (data) {
              this.pokemons = data;
            } else {
              this.pokemons = [];
            }
        });
      }
    });
  }

  async ngOnInit() {
    this.storageService.get('favorites').then((data) => {
      if (data) {
        this.pokemons = data;
      } else {
        this.pokemons = [];
      }
    });
  }

  async details(id: number) {
    // TODO: page details
    console.log(id);
  }

  async removeFromFavorites(id: number) {
    // TODO: alert popup
    for (let counter = 0; counter < this.pokemons.length; counter++) {
      if (this.pokemons[counter].id === id) {
        if (this.pokemons.length === 1) {
          this.pokemons = [];
        } else {
          this.pokemons[counter].isBookmarked = false;
          this.pokemons.splice(counter, 1);
        }
        break;
      }
    }
    this.storageService.set('favorites', this.pokemons);
  }
}
