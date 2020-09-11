import { Version,Environment,EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GetlistsspWebPart.module.scss';
import * as strings from 'GetlistsspWebPartStrings';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
export interface IGetlistsspWebPartProps {
  description: string;
}

export interface ISharepointLists {
  value: ISharepointList[];
}

export interface ISharepointList {
  Title: string;
  Id: string;
}


export default class GetlistsspWebPart extends BaseClientSideWebPart<IGetlistsspWebPartProps> {

  private _getListOfLists(): Promise<ISharepointLists> {
    return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getAndRenderLists():void {
if(Environment.type==EnvironmentType.Local)
{

}
else if(Environment.type==EnvironmentType.ClassicSharePoint ||
        Environment.type==EnvironmentType.SharePoint)
        {
          this._getListOfLists().then(
            (response)=>{
              this.renderListOfLists(response.value);
            });

        }

  }

  private renderListOfLists(items: ISharepointList[]): void {
    let html: string = '';


      items.forEach((item: ISharepointList) => {

        html += `
          <ul class="${styles.list}">
          <li class="${styles.listItem}">
          <span class="ms-font-l">${item.Id}"</span>
          </li>
          <li class="${styles.listItem}">
          <span class="ms-font-l">${item.Title}"</span>
          </li>
          </ul>`;
      });


    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.getlistssp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
        <div id="spListContainer">
        </div>
      </div>`;
     this._getAndRenderLists();

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
