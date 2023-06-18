import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HttpclientWebPart.module.scss';
import * as strings from 'HttpclientWebPartStrings';
import  {SPHttpClient,SPHttpClientResponse,ISPHttpClientOptions} from '@microsoft/sp-http';
export interface IHttpclientWebPartProps {
  description: string;
}

export default class HttpclientWebPart extends BaseClientSideWebPart<IHttpclientWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.httpclient }">
      <h3>Creating a New List Dynamically</h3><br/><br/><br/>
      <p>Please fill out the below details to create a new list programatically</p><br/><br/>
      New List Name: <br/>
      <input type='text' id='txtNewListName'/><br/><br/>
      New List Description: <br/>
       <input type='text' id='txtNewListDescription'/><br/><br/>
      <input type="button" id="btnCreateNewList" value="Create New List"/><br/><br/>
      <p>Please fill out the below details to create a new contactlist programatically</p><br/><br/>
      New contact list Name: <br/>
      <input type='text' id='txtNewLibName'/><br/><br/>
      New contact list Description: <br/>
       <input type='text' id='txtNewListdes'/><br/><br/>
      <input type="button" id="btnCreateNewcontactlist" value="Create New eventslist"/><br/>
      </div>`;
      this.bindEvents();
  }
 private bindEvents():void {
    this.domElement.querySelector('#btnCreateNewList').addEventListener('click',()=>{this.CreateNewList();});
    this.domElement.querySelector('#btnCreateNewcontactlist').addEventListener('click',()=>{this.CreateNewLists1();});

  }
  private CreateNewList():void {
    var newListName=document.getElementById("txtNewListName")["value"];
    var newListDescription=document.getElementById("txtNewListDescription")["value"];
    const listUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('"+newListName+"')";
    this.context.spHttpClient.get(listUrl, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
    if (response.status === 200) {
    alert("List already exists.");
    return; // list already exists
    }
    if (response.status === 404) {
    const url: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists";
    const listDefinition : any = {
    "Title": newListName,
    "Description": newListDescription,
    "AllowContentTypes": true,
    "BaseTemplate": 100, //change the base template 105 for document library
    "ContentTypesEnabled": true,
    };
    const spHttpClientOptions: ISPHttpClientOptions = {
    "body": JSON.stringify(listDefinition)
    };
    this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
    .then((response: SPHttpClientResponse) => {
    if (response.status === 201) {
    alert("List created successfully");
    } else {
    alert("Response status "+response.status+" - "+response.statusText);
    }
    });
    } else {
    alert("Something went wrong. "+response.status+" "+response.statusText);
    }
    });
  }

  private CreateNewLists1():void {
    var newListName=document.getElementById("txtNewLibName")["value"];
    var newListDescription=document.getElementById("txtNewLibDescription")["value"];
    const listUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('"+newListName+"')";
    this.context.spHttpClient.get(listUrl, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
    if (response.status === 200) {
    alert("List already exists.");
    return; // list already exists
    }
    if (response.status === 404) {
    const url: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists";
    const listDefinition : any = {
    "Title": newListName,
    "Description": newListDescription,
    "AllowContentTypes": true,
    "BaseTemplate": 105, //
    "ContentTypesEnabled": true,
    };
    const spHttpClientOptions: ISPHttpClientOptions = {
    "body": JSON.stringify(listDefinition)
    };
    this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
    .then((response: SPHttpClientResponse) => {
    if (response.status === 201) {
    alert("List created successfully");
    } else {
    alert("Response status "+response.status+" - "+response.statusText);
    }
    });
    } else {
    alert("Something went wrong. "+response.status+" "+response.statusText);
    }
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
