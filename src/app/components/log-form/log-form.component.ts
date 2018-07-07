import { Component, OnInit } from '@angular/core';
import { LogService } from './../../services/log.service';
import { Log } from './../../models/logmodel';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id:String;
  text:String;
  date:Date;
  isNew:boolean = true;

  constructor(private logService:LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe((log)=>{
      if(log.id!==null){
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isNew = false
      }
    });
  }

generateUUID(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

clear(){
  this.isNew = true;
  this.text = null;
  this.id = null;
  this.date = null;
}

onSubmit(){
    if(this.isNew){
      const newLog = {
        id:this.generateUUID(),
        text:this.text,
        date:new Date()
      }
      this.logService.addNewLog(newLog);
    }else{
      const updLog = {
        id:this.id,
        text:this.text,
        date:new Date()
      }
      this.logService.updateLog(updLog);
    }
    
    this.clear();
  }

}
