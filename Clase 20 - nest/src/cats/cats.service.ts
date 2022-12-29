import { Injectable } from '@nestjs/common';
import { CreateCatDto } from 'src/dto/create-cat.dto';
import { Cat } from 'src/interfaces/cat/cat.interface';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findByName(name: string): Cat {
    return this.cats.find((e) => e.name == name);
  }

  updateByName(name: string, createCatDto: CreateCatDto): boolean {
    const catIndex = this.cats.findIndex((e) => e.name == name);
    if (catIndex >= 0) {
      this.cats[catIndex] = { ...this.cats[catIndex], ...createCatDto };
      return true;
    } else {
      return false;
    }
  }

  deleteByName(name: string): any {
    const catIndex = this.cats.findIndex((e) => e.name == name);
    if (catIndex >= 0) {
      this.cats = this.cats.filter((e) => e.name != name);
      return { success: true };
    } else {
      return { error: 'No borro' };
    }
  }
}
