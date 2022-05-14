import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../../_services'
import { NbWindowService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList = [];
  loading: boolean = false;
  submit: boolean = false;
  public windowRef: any;
  settings = {
    columns: {
      name: {
        title: 'Product Name',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%'
      },
      price: {
        title: 'Price',
        type: 'number'
      }
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }
      ]

    }
  }

  productForm: FormGroup = new FormGroup({});


  @ViewChild('formTemplate') formTemplate: any;

  constructor(private productService: ProductService,
    private windowService: NbWindowService,
    private FB: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.FB.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/)]],
      _id: ['']
    })
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts({}).subscribe(res => {
      this.loading = false;
      if (res.success && res.data.length > 0) {
        this.productList = res.data;
      } else {
        this.productList = []
      }
    })
  }

  customEvent(event: any) {
    console.log(event)
    if (event.action == "delete") {
      this.loading = true;
      this.productService.deleteProduct({ _id: event.data._id }).subscribe(res => {
        this.loading = false;
        if (res.success) {
          alert(res.message)
          this.getProducts()
        } else {
          alert(res.message)
        }
      })
    } else if (event.action == "edit") {
      this.productForm.setValue({
        name: event.data.name,
        description: event.data.description,
        price: event.data.price,
        _id: event.data._id
      })
      this.openWindow('Edit Product')
    }
  }

  openWindow(title: string) {
    this.submit = false;
    title == 'Add Product' && this.productForm.reset()
    this.windowRef = this.windowService.open(
      this.formTemplate,
      { title: title, context: { text: 'some text to pass into template' } },
    );
  }

  save() {
    this.submit = true;
    if (this.productForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.productForm.controls._id.value) {
      this.productService.updateProduct(this.productForm.value).subscribe(res => {
        this.loading = false;
        if (res.success) {
          alert(res.message)
          this.windowRef.close()
          this.getProducts()
        } else {
          alert(res.message)
        }
      })
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(res => {
        this.loading = false;
        if (res.success) {
          alert(res.message)
          this.windowRef.close()
          this.getProducts()
        } else {
          alert(res.message)
        }
      })
    }
  }



}
