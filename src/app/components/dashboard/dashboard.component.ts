import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { CProductModel, IProductModel } from '../model/model';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   // data: IProductModel[] = []
   // productData: IProductModel;
   // displayedColumns: string[] = ['id', 'productName', 'quantity', 'price', 'actions'];

   // public dataSource!: MatTableDataSource<CProductModel>;
   // public productModel: CProductModel[];

   // @ViewChild(MatPaginator) paginator!: MatPaginator;

   // ngAfterViewInit() {
   //    this.dataSource.paginator = this.paginator;
   // }

   constructor(
      private dialogRef: MatDialog,
      private api: ApiService,
      private router: Router,
      public authService: AuthService) { }

   ngOnInit(): void {
      // this.getProductDetail();
      // this.getUserModel();
   }

   // openAddDialog() {
   //    this.dialogRef.open(AddProductComponent);
   // }

   // openEditDialog(row: any) {
   //    this.dialogRef.open(AddProductComponent, {
   //       data: row
   //    })
   // }



   // getProductDetail() {
   //    this.api.getProduct()
   //       .subscribe(response => {
   //          this.productData = response
   //       })
   // }

   // // ROUTE TO ADDPROD COMPONENT FOR UPDATE
   // edit(id: number) {
   //    this.router.navigate(['Update', id]);
   // }

   // // FOR DELETE BUTTON
   // delete(id: any) {
   //    console.log(id)
   //    this.api.deleteProduct(id)
   //       .subscribe(response => {
   //          alert("Employee Deleted")
   //          location.reload()
   //       })
   // }

   // PAGINATOR
   // getUserModel() {
   //   this.api.getProducts()
   //     .subscribe(response => {
   //       this.productModel = response;
   //       this.dataSource = new MatTableDataSource(this.productModel);
   //       this.dataSource.paginator = this.paginator;
   //     })
   // }
}
