import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { VpcAppsinprogressDataSource } from './vpc-appsinprogress-datasource';
import {FormControl} from '@angular/forms';
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

  startDate = new Date();
  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  applyFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource = new VpcAppsinprogressDataSource(this.paginator, this.sort);
  }
}
