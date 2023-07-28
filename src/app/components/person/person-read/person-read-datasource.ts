import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Person } from 'src/app/views/person/person.model';

/**
// TODO: Replace this with your own data model type
export interface PersonReadDataSource {
  name: string;
  cpf: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Person[] = [
  {id: 1, nome: 'Hydrogen', cpf: '154.641.234-55'},
  {id: 2, nome: 'Helium', cpf: '154.641.234-55'},
  {id: 3, nome: 'Lithium', cpf: '154.641.234-55'},
  {id: 4, nome: 'Beryllium', cpf: '154.641.234-55'},
  {id: 5, nome: 'Boron', cpf: '154.641.234-55'},
  {id: 6, nome: 'Carbon', cpf: '154.641.234-55'},
  {id: 7, nome: 'Nitrogen', cpf: '154.641.234-55'},
  {id: 8, nome: 'Oxygen', cpf: '154.641.234-55'},
  {id: 9, nome: 'Fluorine', cpf: '154.641.234-55'},
  {id: 10, nome: 'Neon', cpf: '154.641.234-55'},
  {id: 11, nome: 'Sodium', cpf: '154.641.234-55'},
  {id: 12, nome: 'Magnesium', cpf: '154.641.234-55'},
  {id: 13, nome: 'Aluminum', cpf: '154.641.234-55'},
  {id: 14, nome: 'Silicon', cpf: '154.641.234-55'},
  {id: 15, nome: 'Phosphorus', cpf: '154.641.234-55'},
  {id: 16, nome: 'Sulfur', cpf: '154.641.234-55'},
  {id: 17, nome: 'Chlorine', cpf: '154.641.234-55'},
  {id: 18, nome: 'Argon', cpf: '154.641.234-55'},
  {id: 19, nome: 'Potassium', cpf: '154.641.234-55'},
  {id: 20, nome: 'Calcium', cpf: '154.641.234-55'},
];


 * Data source for the PersonRead view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PersonReadDataSource extends DataSource<Person> {
  data: Person[] ;
  paginator: MatPaginator ;
  sort: MatSort ;

  constructor(persons: Person[]) {
    super();
    this.data = persons;
  }
  

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Person[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
   
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {        
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Person[]): Person[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Person[]): Person[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'cpf': return compare(+a.cpf, +b.cpf, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
