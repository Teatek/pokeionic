import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  nbPokemons: number;
  savedPokemons: any;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async getPokemons(offset: number, limit: number): Promise<Pokemon[]> | never {
    const request: any = await this.http
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .toPromise();
    if (request.results) {
      await this.storageService.get('favorites').then(
        (data: Pokemon[]) => {
          if (data) {
            this.savedPokemons = data;
          } else {
            this.savedPokemons = [];
          }
        },
        () => (this.savedPokemons = [])
      );
      this.nbPokemons = request.count;
      const pokemons: Pokemon[] = [];
      for (const result of request.results) {
        const url: string[] = result.url.split('/');
        const id: number = +url[url.length - 2];
        const unPokemon: Pokemon = new Pokemon(
          id,
          this.capitalize(result.name)
        );
        for (const savedPokemon of this.savedPokemons) {
          if (savedPokemon.id === id) {
            unPokemon.setIsBookmarked(true);
            break;
          }
        }
        pokemons.push(unPokemon);
      }
      return pokemons;
    } else {
      throw new Error('Impossible d\'obtenir les pokémons.');
    }
  }

  async getPokemon(id: number): Promise<Pokemon> | never {
    const request: any = await this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .toPromise();
    if (request) {
      const pokemon: Pokemon = new Pokemon(id, this.capitalize(request.name));
      pokemon.setWeight(request.weight / 10);
      pokemon.setHeight(request.height / 10);
      return pokemon;
    } else {
      throw new Error('Impossible d\'obtenir les pokémons.');
    }
  }

  capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  getNumberOfPokemons(): number {
    return this.nbPokemons;
  }

}
