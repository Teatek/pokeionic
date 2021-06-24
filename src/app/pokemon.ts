export class Pokemon {
  private id: number;
  private name: string;
  private type: string[];
  private height: number;
  private weight: number;

  constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): string[] {
    return this.type;
  }

  getHeight(): number {
    return this.height;
  }

  getWeight(): number {
    return this.weight;
  }

  setId(id: number) {
      this.id = id;
  }

  setName(name: string) {
      this.name = name;
  }

  setType(type: string[]) {
      this.type = type;
  }

  setHeight(height: number) {
      this.height = height;
  }

  setWeight(weight: number) {
      this.weight = weight;
  }
}
