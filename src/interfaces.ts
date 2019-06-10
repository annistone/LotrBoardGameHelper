export class Unit {
  id: string;
  count: number;
  constructor(id: string) {
    this.id = id;
    this.count = 0;
  }
}

export interface IUnit {
  new (id: string): Unit;
}

export class Platoon {
  id: string;
  units: DataTable<Unit>;
  constructor(id: string) {
    this.id = id;
    this.units = new DataTable();
  }
}

export interface IPlatoon {
  new (id: string): Platoon;
}

export class Actor {
  id: string;
  platoons: DataTable<Platoon>;
  constructor(id: string) {
    this.id = id;
    this.platoons = new DataTable();
  }
}

export interface IActor {
  new (id: string): Actor;
}

export type IItemConstr = IActor | IPlatoon | IUnit;

export interface IItem {
  id: string;
  path: string;
  constr: IItemConstr;
}

export interface IHash<T> {
  [key: string]: T;
}

export class DataTable<T> {
  byId: IHash<T>;
  allIds: string[];
  constructor() {
    this.byId = {};
    this.allIds = [];
  }
}
