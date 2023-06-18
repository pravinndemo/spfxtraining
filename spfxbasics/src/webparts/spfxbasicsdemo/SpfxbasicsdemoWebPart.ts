import { Version, Environment,
  EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxbasicsdemoWebPart.module.scss';
import * as strings from 'SpfxbasicsdemoWebPartStrings';

export interface ISpfxbasicsdemoWebPartProps {
  description: string;
  environmenttitle:string;
}

export default class SpfxbasicsdemoWebPart extends BaseClientSideWebPart<ISpfxbasicsdemoWebPartProps> {

  private findOutEnvironment():void{

    if(Environment.type == EnvironmentType.Local)
    {
     this.properties.environmenttitle="Sharepoint Local ENvironment"
    }
    else if(Environment.type==EnvironmentType.SharePoint||
            Environment.type==EnvironmentType.ClassicSharePoint)
    {
      this.properties.environmenttitle="Sharepoint Online ENvironment"
    }

  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.spfxbasicsdemo }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>

              <p class="${ styles.description }">${escape(this.context.pageContext.web.absoluteUrl)}</p>
              <p class="${ styles.description }">${escape(this.context.pageContext.web.title)}</p>
              <p class="${ styles.description }">${escape(this.context.pageContext.web.serverRelativeUrl)}</p>
              <p class="${ styles.description }">${escape(this.context.pageContext.user.displayName)}</p>
              <p class="${ styles.description }">${escape(this.context.pageContext.user.email)}</p>

              <p class="${ styles.description }">Environment ${Environment.type}</p>
              <p class="${ styles.description }">Environment ${this.properties.environmenttitle}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
      this.findOutEnvironment();
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
