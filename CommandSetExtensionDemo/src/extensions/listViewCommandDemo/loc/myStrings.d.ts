declare interface IListViewCommandDemoCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ListViewCommandDemoCommandSetStrings' {
  const strings: IListViewCommandDemoCommandSetStrings;
  export = strings;
}
