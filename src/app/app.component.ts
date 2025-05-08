import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 's3-image-upload';
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  uploadSuccess = false;
  uploadError = false;
  
  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.selectedFile) return;
  
    const formData = new FormData();
    formData.append('image', this.selectedFile);
  
    this.http.post<any>('https://api-bucket.robofest.vip/api/S3', formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.imageUrl = res.data.url;
          this.uploadSuccess = true;
          this.uploadError = false;
        } else {
          this.uploadSuccess = false;
          this.uploadError = true;
        }
      },
      error: (err) => {
        console.error(err);
        this.uploadSuccess = false;
        this.uploadError = true;
      },
    });
  }
  
}
