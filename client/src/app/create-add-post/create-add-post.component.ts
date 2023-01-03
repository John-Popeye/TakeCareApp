import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {AdvertisementEto} from "../model/advertisementEto";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateService} from "../common/services/updateService/update.service";
import {RestService} from "../common/services/restService/rest.service";
import {POST_DETAILS} from "../app-routing-consts";

@Component({
  selector: 'app-create-add-post',
  templateUrl: './create-add-post.component.html',
  styleUrls: ['./create-add-post.component.css']
})
export class CreateAddPostComponent implements OnInit{

  public formGroup: FormGroup;
  isEdition = true;
  imageName: any;
  url: any;
  disableEndDate: boolean = true;
  minimumValidDate: Date = new Date();

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router,
              private readonly updateService: UpdateService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly restService: RestService, private readonly toastrService: ToastrService) {
    this.imageName = new FormControl();
    this.formGroup = this.formBuilder.group({
      id: [''],
      title: ['', Validators.maxLength(75)],
      animalDescription: ['', Validators.maxLength(75)],
      startDate: [''],
      endDate: [''],
      description: ['', Validators.maxLength(500)],
      phoneNumber: ['', Validators.maxLength(9)],
      address: this.formBuilder.group({
        city: ['', Validators.maxLength(50)],
        zipCode: ['', Validators.pattern(
          '^[0-9]{2}-[0-9]{3}')],
        street: [''],
        homeNumber: [''],
        flatNumber: [''],
      })
    })
  }

  ngOnInit(): void {
    if(this.router.url.includes('/edit')){
      this.disableDateValidation();
    }
    this.activatedRoute.data.subscribe((data: any ) => {
      if(data.post){
        this.formGroup.patchValue(data.post)
        this.url = data.post.base64image;
      }
    })

    this.formGroup.get('startDate').valueChanges.subscribe((val: string) => {
      if(!val || val === ''){
        this.disableEndDate = true;
        this.formGroup.get('endDate').patchValue(null)
      }
      else {this.disableEndDate = false;}
    })
  }


  public createPost(): void {
    const to = new AdvertisementEto(this.formGroup.value);
    to.base64image = this.url;
    this.restService.savePost(to).subscribe((val: AdvertisementEto) => {
      this.toastrService.info("Save succesfull");
      this.updateService.emitUpdate();
      setTimeout(()=> this.router.navigateByUrl(POST_DETAILS(val.id)), 1000)
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
    const file: File = event.target.files[0]
    // max file size 200 KB
    if(file.size > 204800){
      this.toastrService.error('File size is to Big, maximal file is 200KB')
      return
    }
    urlReader.readAsDataURL(file);

    urlReader.onload = (_event) => {
      this.url = urlReader.result;
    }
  }

  public getRequiredErrorMessage(): string{
    return "You must enter a value"
  }

  public getMaxLengthErrorMessage(): string{
    return "Inserted data is too long!"
  }

  private disableDateValidation(): void{
    this.minimumValidDate = new Date(1990, 12, 12);
  }


}

