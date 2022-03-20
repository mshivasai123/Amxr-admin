import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddCertificationsComponent } from '../add-certifications/add-certifications.component';
import { CertificationsService } from '../certifications.service';

export interface PeriodicElement {
  id: number;
  icon: string;
  name: string;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1 , icon : "", name: "UA+", status : 'Active', date: 'July 12th 2022' },
  { id: 2 , icon : "", name: "A", status : 'InActive', date: 'July 12th 2022' }
];

@Component({
  selector: 'app-manage-certifications',
  templateUrl: './manage-certifications.component.html',
  styleUrls: ['./manage-certifications.component.scss']
})
export class ManageCertificationsComponent implements OnInit {

  selectedCertification: any
  searchedKeyword: string;
  statusKey: any;

  constructor(
    public dialog: MatDialog,
    public certificationsService : CertificationsService
  ) { }

  ngOnInit(): void {
    this.getCertifications();
  }

  getCertifications(){
    this.certificationsService.getCertification().subscribe(response =>{
      this.dataSource = response?.data;
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].certificateData = 'api/'+element.certificateData
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  getDate(date:Date){
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
  }

  startAndEndDate(start:Date,end:Date){
    let startDate = new Date(start);
    let endDate = new Date(end);
    return `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()} - ${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}`
  }
  
  displayedColumns: string[] = ['certificateData', 'mediaCertificateName','status', 'action'];
  dataSource : any;

  addCertificate() {
    const dialogRef = this.dialog.open(AddCertificationsComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getCertifications()
      }
    });
  }

  selectCertification(data:any){
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.selectedCertification = data;
  }

  editCertification(data?:string){
    if(data == 'status'){
      this.selectedCertification.status = this.selectedCertification.status == true ? "active" : "in-active";
      let request = {
        id : this.selectedCertification.id,
        status : this.statusKey == "active" ? true : false,
        mediaCertificateName : this.selectedCertification.mediaCertificateName
      }
      this.certificationsService.editCertification(request,'status').subscribe(response =>{
        if(response){
          this.getCertifications()
        }
      })
    } else {
    const dialogRef = this.dialog.open(AddCertificationsComponent, {
      width: '1000px',
      panelClass: ['edit-modal'],
      data: this.selectedCertification,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getCertifications()
      }
    });
   }
  }

  deleteCertification() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.certificationsService.deleteCertification(this.selectedCertification).subscribe(response=>{
          if(response){
            this.getCertifications()
          }
        })
      }
    });
  
  }

}
