import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProductModel } from '../model/model';

@Component({
   selector: 'app-add-product',
   templateUrl: './add-product.component.html',
   styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

   // productData: IProductModel[] = [];
   public _addProductForm: FormGroup;
   actionBtn: string = 'Submit';

   // updatedArticle = this.onUpdateq
   // dataSource = this.productData;
   // lastID: number = 0;

   constructor(
      private formBuilder: FormBuilder,
      private api: ApiService,
      private dialogRef: MatDialogRef<AddProductComponent>,
      @Inject(MAT_DIALOG_DATA) public editData: any
   ) { }



   ngOnInit(): void {
      // this.addProductForm({
      //    name: "",
      //    description: "",
      //    price: 0,
      //    image_link: "",
      //    is_published: ""
      // })
      this.getAddProductForm();
   }

   // fetchData(): void {
   //    this.dataSource = this.productData;
   // }


   getAddProductForm() {
      this._addProductForm = this.formBuilder.group({
         name: new FormControl('', [Validators.required]),
         description: (''),
         price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
         image_link: (''),
         is_published: new FormControl('')
      })
      if (this.editData) {
         this.actionBtn = 'Update',
            this._addProductForm.controls['name'].setValue(this.editData.name),
            this._addProductForm.controls['description'].setValue(this.editData.description),
            this._addProductForm.controls['price'].setValue(this.editData.price),
            this._addProductForm.controls['image_link'].setValue(this.editData.image_link),
            this._addProductForm.controls['is_published'].setValue(this.editData.is_published)
      }
      else {
         return false;
      }
   }

   // addProductForm(data: IProductModel) {
   //    this._addProductForm = this.formBuilder.group({
   //       name: new FormControl(data.name,
   //          [Validators.required]),
   //       description: new FormControl(data.description,
   //          [Validators.required]),
   //       price: new FormControl(data.price,
   //          [Validators.required, Validators.pattern("^[0-9]*$")]),
   //       image_link: new FormControl(data.image_link, [Validators.required]),
   //       is_published: new FormControl(data.is_published)
   //    })
   // }

   onSubmit() {
      // if (!this.editData && this.actionBtn == "Submit") {

      if (this.actionBtn == "Submit") {
         const data = {
            name: this._addProductForm.value.name,
            description: this._addProductForm.value.description,
            price: this._addProductForm.value.price,
            image_link: this._addProductForm.value.image_link,
            is_published: this._addProductForm.value.is_published
         };

         // this.productData.push({
         //    name: this._addProductForm.value.name,
         //    description: this._addProductForm.value.description,
         //    price: this._addProductForm.value.price,
         //    image_link: this._addProductForm.value.image_link,
         //    is_published: this._addProductForm.value.is_published
         // })
         // this.fetchData();
         // this._addProductForm.reset();

         this.api.postProduct(data)
            .subscribe({
               next: response => {
                  console.log(response);
                  this.dialogRef.close();
                  // this.api.getProduct().subscribe((updatedResponse) => {
                  //    this.productData = updatedResponse.data; // Update the productData array with the updated list
                  //    console.log(this.productData);
                  //    console.log("IAMHERE");
                  // }, (error) => {
                  //    console.error("Error occurred while retrieving updated product list:", error);
                  //    // Handle the error or display an error message
                  // });
               },
               error: error => {
                  console.log("Error occurred while saving product:", error);
               }
            });
      }
      else {
         this.onUpdate();
      }
   }

   onUpdate() {
      const data = {
         name: this._addProductForm.value.name,
         description: this._addProductForm.value.description,
         price: this._addProductForm.value.price,
         image_link: this._addProductForm.value.image_link,
         is_published: this._addProductForm.value.is_published,
      };

      this.api.updateProduct(data, this.editData.id)
         .subscribe({
            next: response => {
               console.log("Response Update: ", response);
               console.log("Data Update: ", data);
               alert("Successful updating product");
               this.dialogRef.close();
            },
            error: error => {
               console.log("Error occurred while updating product: ", error);
            }
         });
   }

}
