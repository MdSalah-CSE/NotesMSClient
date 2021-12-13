import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../Models/user';
const token = localStorage.getItem("token");
const headerDict = {
    'Authorization': "Bearer "+token
  }
  
  const requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(headerDict), 
  };
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private http: HttpClient,
    public router: Router,

    public ngZone: NgZone
  ) {}

  apiUrl = environment.apiUrl;

  onSaveNotes(note:any){
    return this.http.post(this.apiUrl + 'Notes/PostNote',note,requestOptions);
  }
  GetCountOfIndividualNotes() {
    return this.http.get(this.apiUrl + 'Notes/GetCountOfIndividualNotes',requestOptions);
  }

  GetAllNotes() {
    return this.http.get(this.apiUrl + 'Notes/GetAllNotes',requestOptions);
  }

  ChangeTaskStatusById(taskId:any){
    return this.http.get(this.apiUrl + 'Notes/ChangeTaskStatusById?taskId='+taskId,requestOptions);
  }

  
  GetTasksForDayWeekMonth(type:any){
      debugger
      
var token = JSON.stringify(localStorage.getItem("token"));
    return this.http.get(this.apiUrl + 'Notes/GetTasksForDayWeekMonth?type='+type,requestOptions);
  }

  GetRemindersForDayWeekMonth(type:any){
      
    return this.http.get(this.apiUrl + 'Notes/GetRemindersForDayWeekMonth?type='+type,requestOptions);
  }
  getRemindersForThisWeek(){
      debugger
    return this.http.get(this.apiUrl + 'Notes/GetRemindersForThisWeek',requestOptions);
  }
  

  GetNoteByType(type:any) {
    return this.http.get(this.apiUrl + 'Notes/GetNoteByType?type='+type,requestOptions);
  }
  
}
