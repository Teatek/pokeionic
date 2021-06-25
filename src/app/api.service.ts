import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  nbPokemons: number;
  constructor(private http: HttpClient) {}

  async getPokemons(offset: number, limit: number): Promise<Pokemon[]> | never {
    const request: any = await this.http
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .toPromise();
    if (request.results) {
      this.nbPokemons = request.count;
      const pokemons: Pokemon[] = [];
      for (const result of request.results) {
        const url: string[] = result.url.split('/');
        const id: number = +url[url.length - 2];
        // TODO: get info if bookmarked or not
        pokemons.push(new Pokemon(id, this.capitalize(result.name)));
      }
      return pokemons;
    } else {
      throw new Error('Impossible d\'obtenir les pokémons.');
    }
  }

  async getPokemon(id: number): Promise<Pokemon> | never {
    const request: any = await this.http.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`)
          .toPromise();
      if(request) {
          const pokemon: Pokemon = new Pokemon(id, this.capitalize(request.name));
          // TODO: get info if bookmarked or not
          pokemon.setWeight(request.weight / 10);
          pokemon.setHeight(request.height / 10);
          return pokemon;
      } else {
          throw new Error('Impossible d\'obtenir le pokémon.');
      }
  }

  capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  getNumberOfPokemons(): number {
    return this.nbPokemons;
  }
}
