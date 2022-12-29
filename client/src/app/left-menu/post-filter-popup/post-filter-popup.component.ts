import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FilterTo} from "../../model/filterTo";
import {FilterSharingService} from "./filter-sharing.service";
import {ToastrService} from "ngx-toastr";
import {zip} from "rxjs";

@Component({
  selector: 'app-post-filter-popup',
  templateUrl: './post-filter-popup.component.html',
  styleUrls: ['./post-filter-popup.component.css']
})
export class PostFilterPopupComponent implements OnInit{

  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<PostFilterPopupComponent>, private readonly formBuilder: FormBuilder, private readonly filterService: FilterSharingService, private readonly growlService: ToastrService) {
    this.form = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      city: [''],
      zipCode: [''],
    })
  }

  ngOnInit(): void {
    this.filterService.getFilterSubscriptiion().subscribe(filter => {
      this.form.patchValue(filter);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.filterService.emitNewFilter(new FilterTo(this.form.value));
      this.dialogRef.close();
    }
    else {
      this.growlService.error("Validation error occured, fix marked fields to continue");
    }
  }

  checkIfZipCodeEnteredAndValid(): boolean{
    const zipCode: AbstractControl = this.form.get('zipCode');
    return zipCode.value.length > 0 && zipCode.valid;
  }
}
