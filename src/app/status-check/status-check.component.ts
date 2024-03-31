import { Component, OnInit, ViewChild } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

const supabaseUrl = 'https://ivdssecobaflwqyievxx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZHNzZWNvYmFmbHdxeWlldnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MzQ0MDEsImV4cCI6MjAyNjQxMDQwMX0.AspPNVvFryDILKQTa21DbyFuTDU5d_9t7gYlrQu9uhY';
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-status-check',
  templateUrl: './status-check.component.html',
  styleUrls: ['./status-check.component.css']
})
export class StatusCheckComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['serialNumber', 'product_name', 'quantity', 'specification', 'vendor_name', 'approve'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  approveProduct(id: number): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to approve this product?', 'Yes', {
      duration: 5000,
    });

    confirmationSnackBar.onAction().subscribe(() => {
      // Add your logic here to handle the approval process for the product with the given id
      console.log('Product approved:', id);
      this.snackBar.open('Product approved successfully', 'Close', {
        duration: 5000,
      });
    });
  }
}