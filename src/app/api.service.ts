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
        pokemons.push(new Pokemon(id, result.name));
      }
      return pokemons;
    } else {
      throw new Error('Impossible d\'obtenir les données.');
    }
  }

  getNumberOfPokemons(): number {
      return this.nbPokemons;
  }
}
