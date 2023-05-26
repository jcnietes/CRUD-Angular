import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { IProductModel } from '../model/model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // data: IProductModel[] = []
  // productData: any;
  // payload: any;
  // public dataSource!: MatTableDataSource<any>;
  public dataSource!: MatTableDataSource<any>;

  // productData: IProductModel[] = []; 
  // dataSource = new MatTableDataSource<IProductModel>(this.productData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'image_link', 'price', 'actions'];

  constructor(
    private dialogRef: MatDialog,
    private api: ApiService,
    public authService: AuthService) { }


  ngOnInit(): void {
    this.getProductDetail();
  }

  onAddDialog() {
    this.dialogRef.open(AddProductComponent);
    // const dialogRef = this.dialogRef.open(AddProductComponent);
    // dialogRef.afterClosed().subscribe((payload: any) => {
    //   if (payload) {
    //     this.payload = payload; // Assign the payload to the global variable
    //     // console.log(this.payload); // Access the payload globally
    //     // Perform any necessary operations with the payload
    //   }
    // });
  }

  onEditDialog(row: any) {
    this.dialogRef.open(AddProductComponent, {
      data: row
    })
  }
  // getProductDetail() {
  //   this.api.getProduct().subscribe({
  //     next: (response) => {
  //       console.log("PRODUCT LIST getProduct =>>", response)
  //       if (response) {
  //         this.dataSource = new MatTableDataSource(response.data);
  //         this.dataSource.paginator = this.paginator;
  //       } else {
  //         console.error("Invalid data format. Expected an array.");
  //       }
  //     },
  //     error: (error) => {
  //       console.error("ERROR in getProductDetail()" + error);
  //     }
  //   });
  // }

  getProductDetail() {
    this.api.getProduct()
      .subscribe({
        next: (response) => {
          console.log("Product List: ", response); // 
          if (response) {
            this.dataSource = new MatTableDataSource(response.data);
            this.dataSource.paginator = this.paginator;
          } else {
            console.log("Invalid data format. Expected an array.");
          }
        },
        error: (error) => {
          console.log("ERROR in getProductDetail(): " + error);
        }
      });
  }


  // test!
  onDelete(id: any) {
    console.log(id);
    this.api.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response)
        this.dataSource.data = this.dataSource.data.filter((product: any) => product.id !== id);

        // this.dataSource = new MatTableDataSource<IProductModel>(this.productData);
        // this.dataSource.paginator = this.paginator;
        console.log("Product deleted successfully: ", response);
        console.log(this.dataSource)
      },
      error: (error) => {
        console.log("Error occurred while deleting product: ", error);
      }
    });
  }

  // FOR DELETE BUTTON
  // onDelete(id: any) {
  //   console.log(id)
  //   this.api.deleteProduct(id)
  //     .subscribe(response => {
  //       alert("Employee Deleted")
  //     })
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
