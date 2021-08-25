export class Time {
  year: number;
  month: number;
  day: number;
  week: string; // 요일
  hour: number;
  minute: number;
  second: number;

  constructor(year: number, month: number, day: number, week: string, hour: number, minute: number, second: number) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.week = week;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }
}