export interface SimpleTableColumn {
  key: string;
  title: string;
 // pipe: {
 //   name: string,
 //   param: string
 // } 
}

export class SimpleTableSettings {
  actions: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
}
