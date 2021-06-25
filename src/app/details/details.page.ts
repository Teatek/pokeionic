import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {Pokemon} from '../pokemon';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    id = 0;
    pokemon: Pokemon;

  constructor(public route: ActivatedRoute, private apiService: ApiService) {
      this.route.params.subscribe((params) => {
          this.id = params.id;
      });
  }

  async ngOnInit() {
      this.pokemon = await this.apiService.getPokemon(this.id);
  }
}
