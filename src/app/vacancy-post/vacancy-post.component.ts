import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ToastrUtility } from '../utility/toast.utility';
import { VacancyPostService } from '../service/vacancy-post.service'
import { Vacancy } from '../model/vacancy';
import { Department } from '../model/department';

@Component({
  selector: 'app-vacancy-post',
  templateUrl: './vacancy-post.component.html',
  styleUrls: ['./vacancy-post.component.css']
})
export class VacancyPostComponent implements OnInit{

  vacancyPostForm = new FormGroup({
    departmentName: new FormGroup("", Validators.required),
    file: new FormGroup([], Validators.required) 
  });

  department: Department = {
    departmentId: '', //department id (auto assignable)
    departmentName: ''  //department name
  };

  vacancy: Vacancy = {
    vacacyId: '',
    vacancyTitle: '',
    jobType: '',
    jobRole: '',
    isApproved: false,
    location: '',
    file: []
  }

  constructor (private toast: ToastrUtility, private vacancyPostService: VacancyPostService){
  }

  ngOnInit(): void {
  }

  submitVacancyPost(){
    console.log("i must run first"); //use for testing/debugging

    if(this.vacancyPostForm.value.departmentName !== "select department"){
      this.toast.showtoastrSuccess("Vacancy post success", "Submission success");
    
    }else{
      this.toast.showtoastrError("Failed to post vacancy", "Submission failed");
    }

    this.department.departmentName = this.vacancyPostForm.value.departmentName!;
    this.vacancy.file = this.vacancyPostForm.value.file!;

    this.departmentDetails(this.department);
    setTimeout(() => {
    }, 1800);

    this.vacancyDetails(this.vacancy);
    setTimeout(() => {
    }, 1800);

  }

  departmentDetails(department: Department): void{
    this.vacancyPostService.saveDepartment(department).subscribe({
      error: (error) => {
        this.toast.showtoastrError(error, "Request status");
        console.log(error);
        setTimeout(() => {
        }, 1500);
      },
      complete: () => this.toast.showtoastrSuccess("Save Request Successful.", "Request Status")
    })

  }

  vacancyDetails(vacancy: Vacancy): void{
    this.vacancyPostService.saveVacancy(vacancy).subscribe({
        error: (error) => {
          this.toast.showtoastrError(error, "Request status");
          console.log(error);
          setTimeout(() => {
          }, 1500);
        },
        complete: () => this.toast.showtoastrSuccess("Save Request Successful.", "Request Status")
    })

  }

  browseVacancyAd(event: any): void{
    event.preventDefault();
    document.getElementById("vacancy-post-ad")?.click();

  }

}
