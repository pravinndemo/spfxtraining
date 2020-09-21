import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MultipleGroupWebPart.module.scss';
import * as strings from 'MultipleGroupWebPartStrings';

export interface IMultipleGroupWebPartProps {
  description: string;
  productname:string;
  isCertified:boolean;
}

export default class MultipleGroupWebPart extends BaseClientSideWebPart<IMultipleGroupWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.multipleGroup }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <p class="${ styles.description }">${escape(this.properties.productname)}</p>
              <p class="${ styles.description }">${this.properties.isCertified}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "page 1"
          },
          groups: [
            {
              groupName: "Product Group 1",
              groupFields: [
                PropertyPaneTextField('productname', {
                  label: "Product Name 1"
                })
              ]
            },
            {
              groupName: "Product Group 2",
              groupFields: [
                PropertyPaneToggle('isCertified', {
                  label: "Is Certified 1?"
                })
              ]
            }
          ],
          displayGroupsAsAccordion:true
        },
        {
          header: {
            description: "page 2"
          },
          groups: [
            {
              groupName: "Product Group1 page2",
              groupFields: [
                PropertyPaneTextField('productname', {
                  label: "Product Name 2"
                })
              ]
            },
            {
              groupName: "Product Group2 page2",
              groupFields: [
                PropertyPaneToggle('isCertified', {
                  label: "Is Certified 2?"
                })
              ]
            }
          ],
          displayGroupsAsAccordion:true
        }
      ]
    };
  }
}
