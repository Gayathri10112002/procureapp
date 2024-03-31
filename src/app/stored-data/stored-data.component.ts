import { Component, OnInit, ViewChild } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

const supabaseUrl = 'https://ivdssecobaflwqyievxx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZHNzZWNvYmFmbHdxeWlldnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MzQ0MDEsImV4cCI6MjAyNjQxMDQwMX0.AspPNVvFryDILKQTa21DbyFuTDU5d_9t7gYlrQu9uhY';
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-stored-data',
  templateUrl: './stored-data.component.html',
  styleUrls: ['./stored-data.component.css']
})
export class StoredDataComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['serialNumber', 'product_name', 'quantity', 'specification', 'vendor_name', 'update', 'delete'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 //EDIT
  editingRow: any = null;
  editedProduct: any = {};

  startEditing(row: any): void {
    this.editingRow = row;
    this.editedProduct = { ...row };
  }

  cancelEditing(): void {
    this.editingRow = null;
    this.editedProduct = {};
  }

  saveChanges(): void {
    const { id } = this.editingRow;
    const updatedData = this.editedProduct;

    supabase
      .from('product')
      .update(updatedData)
      .eq('id', id)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error updating product:', error);
        } else {
          console.log('Product updated successfully');
          this.fetchProducts();
          this.cancelEditing();
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 5000,
          });
        }
      });
  }
 //DELETE
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    supabase
      .from('product')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          this.products = data;
          this.updateDataSource();
        }
      });
  }

  updateDataSource(): void {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
  }

  deleteProduct(id: number): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this product?', 'Yes', {
      duration: 5000,
    });

    confirmationSnackBar.onAction().subscribe(() => {
      supabase
        .from('product')
        .delete()
        .eq('id', id)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error deleting product:', error);
          } else {
            console.log('Product deleted successfully');
            this.fetchProducts();
            this.snackBar.open('Product deleted successfully', 'Close', {
              duration: 5000,
            });
          }
        });
    });
  }
}