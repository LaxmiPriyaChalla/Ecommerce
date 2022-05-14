import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  addProduct(payload: object) {
    let url = `${this.baseUrl}api/addProduct`
    return this.http.post<any>(url, payload)
  }

  updateProduct(payload: object) {
    let url = `${this.baseUrl}api/updateProduct`
    return this.http.post<any>(url, payload)
  }

  deleteProduct(payload: object) {
    let url = `${this.baseUrl}api/deleteProduct`
    return this.http.post<any>(url, payload)
  }

  getProducts(payload: object) {
    let url = `${this.baseUrl}api/getProducts`
    return this.http.post<any>(url, payload)
  }
}
