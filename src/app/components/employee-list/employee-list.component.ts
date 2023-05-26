import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { IUserModel } from '../model/model';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  data: IUserModel[] = []
  productData: IUserModel;
  displayedColumns: string[] = ['id', 'username', 'password', 'actions'];

  public dataSource!: MatTableDataSource<IUserModel>;
  public productModel: IUserModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private dialogRef: MatDialog,
    private api: ApiService,
    private router: Router,
    public authService: AuthService) { }

  // This always run first to load data before rendering the components
  ngOnInit(): void {
    // this.getProductDetail();
    // this.getUserModel();
  }

  // openAddDialog() {
  //   this.dialogRef.open(AddProductComponent);
  // }

  // openEditDialog(row: any) {
  //   // console.log(row)
  //   this.dialogRef.open(AddProductComponent, {
  //     data: row
  //   })
  // }


  // getProductDetail() {
  //   this.api.getUser()
  //     .subscribe(response => {
  //       this.productData = response
  //     })
  // }

  // // ROUTE TO ADDPROD COMPONENT FOR UPDATE
  // edit(id: number) {
  //   this.router.navigate(['Update', id]);
  // }

  // // FOR DELETE BUTTON
  // delete(id: any) {
  //   console.log(id)
  //   this.api.deleteProduct(id)
  //     .subscribe(response => {
  //       alert("Employee Deleted")
  //       location.reload()
  //     })
  // }

  // PAGINATOR
  // getUserModel() {
  //   this.api.getUser()
  //     .subscribe(response => {
  //       this.productModel = response;
  //       this.dataSource = new MatTableDataSource(this.productModel);
  //       this.dataSource.paginator = this.paginator;
  //     })
  // }

}
