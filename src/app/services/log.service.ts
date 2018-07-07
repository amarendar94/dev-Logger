import { Log } from './../models/logmodel';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs:Log[]

  private logSource = new BehaviorSubject<Log>({id:null,text:null,date:null});
  selectedLog = this.logSource.asObservable();


  constructor() { 
    this.logs = [{id:"1",text:"Generated Component", date:new Date("07/05/2017")},
    {id:"2",text:"Added Bootstrap", date:new Date("08/06/2017")},
    {id:"3",text:"Added Login", date:new Date("09/09/2017")}]
  }

  getLogs():Observable<Log[]>{
    return of(this.logs);
  }

  setFormLog(log:Log){
    this.logSource.next(log)
  }

  addNewLog(log:Log){
    this.logs.unshift(log);
  }

  updateLog(log:Log){
    this.logs.forEach((value,index)=>{
      if(value.id === log.id){
        this.logs.splice(index,1);
      }
    });
    this.logs.unshift(log);
  }

  deleteLog(log:Log){
    this.logs.forEach((value,index)=>{
      if(value.id === log.id){
        this.logs.splice(index,1);
      }
    });
  }

}
