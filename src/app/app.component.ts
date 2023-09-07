import { Component,ViewChild, Renderer2, ElementRef, OnInit } from '@angular/core';
import * as _moment from 'moment';
import {HttpClient} from '@angular/common/http';
import { DateAdapter } from '@angular/material/core';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;



interface BusinessCalendar{
  closedForOrdering:boolean;
  date:string;
  formattedDate:string;
  name:string;
  type:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  checked = false;
  specialDates:any[] = [];
  disabledDates: Date[]=[];
  constructor(private renderer: Renderer2,private dateAdapter:DateAdapter<Date>, private http:HttpClient) {}
  
  ngOnInit(): void {
    this.http.get<{businessCalendarList:BusinessCalendar[]}>('/assets/holidays.json').subscribe(data =>{
      this.disabledDates=data.businessCalendarList.filter(entry=>entry.closedForOrdering).map(entry=> new Date(entry.formattedDate));
      this.specialDates=data.businessCalendarList.map(entry=>({
        date:new Date(entry.formattedDate),
        tooltipText:entry.name,
      }));
      
      // console.log("specialdates:",this.specialDates);
    //  console.log('Disabled dates:', this.disabledDates);
      
    });}
updateDayStyles() {
    let matchingElements: Element[]=[];
    let calendardates=document.querySelectorAll('button.mat-calendar-body-cell.mat-calendar-body-disabled');
    let disabled=Array.from(calendardates);
   disabled.forEach(dateElement =>{
    let datesOntheScreen=moment(dateElement.getAttribute('aria-label'));
      this.specialDates.forEach(holiday=>{
      let holidayDate= moment(holiday.date);
      if(datesOntheScreen.isSame(holidayDate, 'day')){
        var divElement=document.createElement('div');
        divElement.classList.add('tooltip');
        var spanElement=document.createElement("span");
        let dynamicelement=holiday.tooltipText;
        spanElement.innerHTML=dynamicelement;
        spanElement.classList.add('tooltiptext');
        divElement.appendChild(spanElement);
       dateElement.addEventListener('mouseover', function(event){
        var targetDateElement=event.target;

        console.log("targetDateElement",targetDateElement);
        var rect=dateElement.getBoundingClientRect();
        
        divElement.style.position='absolute';
        divElement.style.bottom=(rect.bottom)+'px';
        divElement.style.left=(rect.left-60)+'px';
        divElement.style.top=(rect.top-35)+'px';
        divElement.style.right=(rect.right)+'px';
        
          document.body.appendChild(divElement);
          // console.log("append span:",divElement);
        
       });
       dateElement.addEventListener('mouseout',function(){
        var tooltipdiv=document.querySelector('.tooltip');
        if(tooltipdiv){
          divElement.remove();
        }
       })
        
       
      }
      
    })
   
    
   }) 
  }

  listeners:any[] = [];

  calendarClosed(event:any) {
    this.listeners.forEach(v => v());
  }

  calendarOpened(event:any) {
    setTimeout(() => {
      this.listeners.forEach(v => {
        v();
      });

      this.listeners = [];

      let buttons = document.querySelectorAll('mat-calendar .mat-calendar-body-cell, mat-calendar button, mat-calendar .mat-icon-button');

      buttons.forEach(btn => {
        let x = this.renderer.listen(btn, 'click', () => {
          setTimeout(() => {
            this.calendarOpened(event);
          });
        })

        this.listeners.push(x);
      });
      this.updateDayStyles();
    });
  }

  dateFilter=(date:Date|null):any=>{
    if(!date){
      return false;
    }
    const day=date.getDay();
    return day!==0 && day!==6 &&!this.disabledDates.some((disabledDates: Date)=>this.dateAdapter.compareDate(date, disabledDates) === 0);
  }
}