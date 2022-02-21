import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData;
  allRestaurantData:any;
  showAdd!:boolean;
  showBtn!:boolean;


  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
  }  

  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  // Subscribing our data which is mapped through services
  addResto(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      alert('Restaurnt records added successfully');

      // clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData(); // when we post any data
    },
    err=>{
      alert('Error in adding restaurant records');
    }
    )
  }

  // Get all restaurant data
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData = res;
    })
  }

  // Delete restaurant data
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert('Restaurant Record Deleted');
      this.getAllData(); //Quick refresh data on deletion
    })
    }

    // Edit Items
    onEditResto(data:any){
      this.showAdd = false;
      this.showBtn = true;

      this.restaurantModelObj.id =data.id;

      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['services'].setValue(data.services);

    }

    updateResto(){
      this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res=>{
      alert('Restaurant Records Updated')

      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData(); // when we post any data

    })

    }
}

