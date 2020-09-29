export class CutsomLibraryLibrary {
  public name(): string {
    return 'CutsomLibraryLibrary';
  }

public getCurrentTime():string {

  let currentDate: Date;
  let str:string;
  currentDate=new Date();
  str="<br>Todays Date is: "+ currentDate.toDateString();
  str +="<br> Current Time is : " + currentDate.toTimeString();
  return(str);
}
}
