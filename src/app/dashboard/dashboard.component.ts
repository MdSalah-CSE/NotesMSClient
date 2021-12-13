import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../Services/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  regularNotes: any = null;
  reminders: any = null;
  tasks: any = null;
  bookmarks: any = null;

  reminderTitle = 'Reminders for today';
  reminderType = 1;
  tasksTitle = 'Tasks for today';
  taskType = 1;

  taskText: any;
  reminderText: any;
  taskDueDate: any;
  reminderDateTime:any;
  regularNoteText:any;
  bookmarkWebURL:any;

  note: any = {
    id: null,
    userId:null,
    type: '',
    text: '',
    reminderDateTime: '',
    dueDate: '',
    taskStatus: '0',
    webURL: '',
    makeDate: '',
  };

  userId:any = null;

  countsOfIndividualNotes: any = null;

  constructor(private NoteService: NoteService,private router:Router) {
    this.GetCountOfIndividualNotes();
    this.GetRegularNotes();
    this.GetBookmarks();
    this.GetRemindersForToday();
    this.GetTasksForDayWeekMonth(1);
  }

  ngOnInit(): void {
    debugger
    this.regularNotes = null;
  this.reminders = null;
  this.tasks = null;
  this.bookmarks = null;
    var use:any = localStorage.getItem('user');
    var user:any = JSON.parse(use)
    this.userId = user.userId;
  }

  onSaveTask() {
    
    var textCharecterCount = this.taskText.length;
    if(textCharecterCount > 100){
      alert("Note text is more than 100 characters!!")
      this.taskText = null;
      return;
    }
    this.note.userId = this.userId;
    this.note.text = this.taskText;
    this.note.dueDate = this.taskDueDate;
    this.note.type = 3;
    this.NoteService.onSaveNotes(this.note).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.retCode == '1') {
          alert('Save Successfull');
          this.note = {
            id: null,
            type: '',
            text: '',
            reminderDateTime: '',
            dueDate: '',
            taskStatus: '0',
            webURL: '',
            makeDate: '',
          };
          this.taskText = null;
          this.taskDueDate = null;
          this.GetTasksForDayWeekMonth(1);
        }else{
          alert('Save Failed');
        }
      },
      (error) => {
        alert('Save Failed');
      }
    );
  }

  onSaveBookmark() {
    this.note.userId = this.userId;
    this.note.webURL = this.bookmarkWebURL;
    this.note.type = 4;
    this.NoteService.onSaveNotes(this.note).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.retCode == '1') {
          alert('Save Successfull');
          this.note = {
            id: null,
            type: '',
            text: '',
            reminderDateTime: '',
            dueDate: '',
            taskStatus: '0',
            webURL: '',
            makeDate: '',
          };
          this.bookmarkWebURL = null;
          this.GetBookmarks();
        }else{
          alert('Save Failed');
        }
      },
      (error) => {
        alert('Save Failed');
      }
    );
  }
  onSaveRegularNote() {
    debugger
    var textCharecterCount = this.regularNoteText.length;
    if(textCharecterCount > 100){
      alert("Note text is more than 100 characters!!")
      this.regularNoteText = null;
      return;
    }
    this.note.userId = this.userId;
    this.note.text = this.regularNoteText;
    this.note.type = 1;
    this.NoteService.onSaveNotes(this.note).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.retCode == '1') {
          alert('Save Successfull');
          this.note = {
            id: null,
            type: '',
            text: '',
            reminderDateTime: '',
            dueDate: '',
            taskStatus: '0',
            webURL: '',
            makeDate: '',
          };
          this.regularNoteText = null;
          this.GetRegularNotes();
        }else{
          alert('Save Failed');
        }
      },
      (error) => {
        alert('Save Failed');
      }
    );
  }

  onSaveReminder() {
    var textCharecterCount = this.reminderText.length;
    if(textCharecterCount > 100){
      alert("Note text is more than 100 characters!!")
      this.reminderText = null;
      return;
    }
    this.note.userId = this.userId;
    this.note.text = this.reminderText;
    this.note.reminderDateTime = this.reminderDateTime;
    this.note.type = 2;
    this.NoteService.onSaveNotes(this.note).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.retCode == '1') {
          alert('Save Successfull');
          this.note = {
            id: null,
            type: '',
            text: '',
            reminderDateTime: '',
            dueDate: '',
            taskStatus: '0',
            webURL: '',
            makeDate: '',
          };
          this.reminderText = null;
          this.reminderDateTime = null;
    this.GetRemindersForToday();
        }else{
          alert('Save Failed');
        }
      },
      (error) => {
        alert('Save Failed');
      }
    );
  }

  GetRegularNotes() {
    
    this.NoteService.GetNoteByType(1).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.length > 0) {
          this.regularNotes = data;
        }
      },
      (error) => {}
    );
  }

  onChangeTaskStatus(taskId: any) {
    
    this.NoteService.ChangeTaskStatusById(taskId).subscribe(
      (data: any) => {
        
        console.log(data);
      },
      (error) => {
      }
    );
  }

  GetTasksForDayWeekMonth(type: any) {
    
    this.NoteService.GetTasksForDayWeekMonth(type).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.length > 0) {
          this.tasks = null;
          this.tasks = data;
          this.taskType = type;
          if (this.taskType == 1) {
            this.tasksTitle = 'Tasks for today';
          } else if (this.taskType == 2) {
            this.tasksTitle = 'Tasks for this week';
          } else if (this.taskType == 3) {
            this.tasksTitle = 'Tasks for this month';
          }
        }
      },
      (error) => {
       
      }
    );
  }

  GetRemindersForToday() {
    
    this.NoteService.GetRemindersForDayWeekMonth(1).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.length > 0) {
          this.reminders = null;
          this.reminders = data;
        }
      },
      (error) => {}
    );
  }
  getRemindersForThisWeek() {
    
    this.NoteService.GetRemindersForDayWeekMonth(2).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.length > 0) {
          this.reminderType = 2;
          this.reminderTitle = 'Reminders for this week';
          this.reminders = null;
          this.reminders = data;
        }
      },
      (error) => {}
    );
  }
  getRemindersForThisMonth() {
    
    this.NoteService.GetRemindersForDayWeekMonth(3).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.length > 0) {
          this.reminderType = 3;
          this.reminderTitle = 'Reminders for this month';
          this.reminders = null;
          this.reminders = data;
        }
      },
      (error) => {}
    );
  }

  GetBookmarks() {
    
    this.NoteService.GetNoteByType(4).subscribe(
      (data: any) => {
        
        console.log(data);
        if (data.length > 0) {
          this.bookmarks = data;
        }
      },
      (error) => {}
    );
  }
  GetCountOfIndividualNotes() {
    this.NoteService.GetCountOfIndividualNotes().subscribe(
      (data: any) => {
        
        console.log(data);

        if (data.length > 0) {
          this.countsOfIndividualNotes = data;
        }
      },
      (error) => {}
    );
  }
}
