import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  user_list: any;
  constructor(private appService: AppServiceService) {}

  ngOnInit(): void {
    this.getUserList();
  }
  getUserList() {
    this.appService.getUserDetails().subscribe((res: any) => {
      this.user_list = res;
      console.log('this.user_list', this.user_list);
    });
  }
}
