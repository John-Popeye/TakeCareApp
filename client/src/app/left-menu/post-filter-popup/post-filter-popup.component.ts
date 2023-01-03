import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FilterTo} from "../../model/filterTo";
import {FilterSharingService} from "./filter-sharing.service";
import {ToastrService} from "ngx-toastr";
import {zip} from "rxjs";
import {Router} from "@angular/router";
import {POSTS_HOMEPAGE} from "../../app-routing-consts";

@Component({
  selector: 'app-post-filter-popup',
  templateUrl: './post-filter-popup.component.html',
  styleUrls: ['./post-filter-popup.component.css']
})
export class PostFilterPopupComponent implements OnInit{

  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<PostFilterPopupComponent>,
              private readonly router: Router,
              private readonly formBuilder: FormBuilder, private readonly filterService: FilterSharingService, private readonly growlService: ToastrService) {
    this.form = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      city: ['']
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
      const filter: FilterTo = this.form.value
      for( let property in filter) {
        if(property === ''){
          property = null;
        }
      }
      this.router.navigateByUrl(POSTS_HOMEPAGE)
      setTimeout(()=>this.filterService.emitNewFilter(new FilterTo(this.form.value)), 1000);
      this.dialogRef.close();
    }
    else {
      this.growlService.error("Validation error occured, fix marked fields to continue");
    }
  }
}
