import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NgxFileDropEntry} from "ngx-file-drop";
import {HttpClient} from "@angular/common/http";
import {AdvertisementEto} from "../model/advertisementEto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-add-post',
  templateUrl: './create-add-post.component.html',
  styleUrls: ['./create-add-post.component.css']
})
export class CreateAddPostComponent {

  public formGroup: FormGroup;
  isEdition = true;
  selectedFile: File;
  imageName: any;
  url: any;

  constructor(private readonly formBuilder: FormBuilder, private readonly httpService: HttpClient, private readonly toastrService: ToastrService) {
    this.imageName = new FormControl();
    this.formGroup = this.formBuilder.group({
      id: [''],
      title: [''],
      animalsDescription: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
      address: this.formBuilder.group({
        city: [''],
        zipCode: [''],
        street: [''],
        homeNumber: [''],
        flatNumber: [''],
      })
    })
  }


  public createPost(): void {
    const to = new AdvertisementEto(this.formGroup.value);
    to.base64image = this.url;
    this.httpService.post('/post-service/v1/posts/create', JSON.stringify(to), {headers: {'Content-Type': 'application/json'}}).subscribe(val => {
      this.toastrService.info("Post succesfully created");
    })

  }




  //Gets called when the user selects an image
  public onFileChanged(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.toastrService.show('You must select an image')
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.toastrService.show('Only Images are supported')
      return;
    }

    const urlReader = new FileReader();
    urlReader.readAsDataURL(event.target.files[0]);

    urlReader.onload = (_event) => {
      this.url = urlReader.result;
    }
  }


}

