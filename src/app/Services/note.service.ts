import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../Models/user';
const token = localStorage.getItem('token');
const headerDict = {
  Authorization: 'Bearer ' + token,
};

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  userId: any = null;
  constructor(
    private http: HttpClient,
    public router: Router,

    public ngZone: NgZone
  ) {}

  apiUrl = environment.apiUrl;

  onSaveNotes(note: any) {
    return this.http.post(this.apiUrl + 'Notes/PostNote', note, requestOptions);
  }
  GetCountOfIndividualNotes() {
    var use: any = localStorage.getItem('user');
    var user: any = JSON.parse(use);
    this.userId = user.userId;
    return this.http.get(
      this.apiUrl + 'Notes/GetCountOfIndividualNotes?userId=' + this.userId,
      requestOptions
    );
  }

  ChangeTaskStatusById(taskId: any) {
    return this.http.get(
      this.apiUrl + 'Notes/ChangeTaskStatusById?taskId=' + taskId,
      requestOptions
    );
  }

  GetTasksForDayWeekMonth(type: any) {
    debugger;
    var use: any = localStorage.getItem('user');
    var user: any = JSON.parse(use);
    this.userId = user.userId;
    return this.http.get(
      this.apiUrl +
        'Notes/GetTasksForDayWeekMonth?type=' +
        type +
        '&userId=' +
        this.userId,
      requestOptions
    );
  }

  GetRemindersForDayWeekMonth(type: any) {
    var use: any = localStorage.getItem('user');
    var user: any = JSON.parse(use);
    this.userId = user.userId;
    return this.http.get(
      this.apiUrl +
        'Notes/GetRemindersForDayWeekMonth?type=' +
        type +
        '&userId=' +
        this.userId,
      requestOptions
    );
  }
  getRemindersForThisWeek() {
    debugger;
    var use: any = localStorage.getItem('user');
    var user: any = JSON.parse(use);
    this.userId = user.userId;
    return this.http.get(
      this.apiUrl + 'Notes/GetRemindersForThisWeek?userId=' + this.userId,
      requestOptions
    );
  }

  GetNoteByType(type: any) {
    var use: any = localStorage.getItem('user');
    var user: any = JSON.parse(use);
    this.userId = user.userId;
    return this.http.get(
      this.apiUrl +
        'Notes/GetNoteByType?type=' +
        type +
        '&userId=' +
        this.userId,
      requestOptions
    );
  }
}
