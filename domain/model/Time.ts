export class Time {
  private static WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

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

  static parse = (date: Date): Time => {
    return new Time(date.getFullYear(), date.getMonth() + 1, date.getDate(), Time.WEEKDAY[date.getDay()], date.getHours(), date.getMinutes(), date.getSeconds());
  }
}