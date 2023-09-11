import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeUtilService {

  constructor() { }

  elapseHours(date : Date, hours: number) {
    const currentTime = date.getTime()
    const newDate = currentTime + (hours*60*60*1000)
    return new Date(newDate)
  }

  elapseMinutes(date: Date, minutes: number) {
    const currentTime = date.getTime()
    const newDate = currentTime + (minutes*60*1000)
    return new Date(newDate)
  }

  elapseDay(date : Date, day : number) {
    const currentTime = date.getTime()
    const newDate = currentTime + (day*24*60*60*1000)
    return new Date(newDate)
  }

  elapseSeconds(date : Date, seconds : number) {
    const currentTime = date.getTime()
    const newDate = currentTime + (seconds*1000)
    return new Date(newDate)
  }
}
