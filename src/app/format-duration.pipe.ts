import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(value: number): string {
   
    let secValue=Math.floor(value / 1000);  
    let hours:any = Math.floor(secValue / 3600);  
    let minutes:any =Math.floor(secValue / 60);  
    let sec:any = secValue % 60;
  if(hours<10){
    hours ='0'+hours;
  }
  if(minutes<10){
    minutes ='0'+minutes;
  }
  if(sec<10){
    sec ='0'+sec;
  }


    return `${hours}: ${minutes}:${sec}`;     
  }

}
