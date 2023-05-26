import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductModel } from '../components/model/model';
import { AuthService } from './auth.service';

const token_header_key = 'Authorization'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string = this.authService.getToken()
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  private baseUrl = "https://api-001.emberspec.com/";

  // POST PRODUCT
  postProduct(data: any) {
    return this.http.post<any>(this.baseUrl + "api/products", data, this.httpHeaders)
  }

  // GET ALL PRODUCT
  getProduct() {
    return this.http.get<any>(this.baseUrl + "api/products", this.httpHeaders)
  }

  // UPDATE PRODUCT by ID
  updateProduct(data: IProductModel, id: number) {
    return this.http.put<any>(this.baseUrl + "api/products" + '/' + id, data, this.httpHeaders)
  }

  // DELETE PRODUCT by ID
  deleteProduct(id: number) {
    return this.http.delete<any>(this.baseUrl + "api/products" + '/' + id, this.httpHeaders)
  }

  // GET PRODUCT by ID
  // getProductId(id: number) {
  //   return this.http.get<any>(`${this.baseUrl + "api/products"}/${id}`)
  // }

  // GET ALL PRODUCT []
  // getProducts() {
  //   return this.http.get<CProductModel[]>(this.baseUrl + "api/products")
  // }

}
