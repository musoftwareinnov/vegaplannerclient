import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { VpcAppsinprogressDataSource } from './vpc-appsinprogress-datasource';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-vpc-appsinprogress',
  templateUrl: './vpc-appsinprogress.component.html',
  styleUrls: ['./vpc-appsinprogress.component.css']
})
export class VpcAppsinprogressComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: VpcAppsinprogressDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  applyFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource = new VpcAppsinprogressDataSource(this.paginator, this.sort);
  }
}
