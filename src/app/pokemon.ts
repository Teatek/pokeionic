export class Pokemon {
  private id: number;
  private name: string;
  private type: string[];
  private height: number;
  private weight: number;
  private isBookmarked: boolean;

  constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
      this.type = [];
      this.weight = 0;
      this.height = 0;
      this.isBookmarked = false;
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

  getIsBookmarked(): boolean {
    return this.isBookmarked;
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

  setIsBookmarked(isBookmarked: boolean) {
    this.isBookmarked = isBookmarked;
  }
}
