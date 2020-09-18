import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropertypanewebpartWebPart.module.scss';
import * as strings from 'PropertypanewebpartWebPartStrings';

export interface IPropertypanewebpartWebPartProps {
  description: string;

  //for text box propertypane
  productname:string;
  productdescription:string;
  productcost:number;
  quantity:number;
  billamount:number;
  discount:number;
  netbillamount:number;

  //for toggle
  currentTime:Date;
  IsCertified:boolean;

  //slider
  Rating:number;

  //choice group
  processortype:string;

  InvoiceFileType:string;

}

export default class PropertypanewebpartWebPart extends BaseClientSideWebPart<IPropertypanewebpartWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.propertypanewebpart }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
             <table>
             <tr>
             <td>Product Name</td>
             <td>${this.properties.productname}</td>
             </tr>
             <tr>
             <td>Product Description</td>
             <td>${this.properties.productdescription}</td>
             </tr>
             <tr>
             <td>Product Cost</td>
             <td>${this.properties.productcost}</td>
             </tr>
             <tr>
             <td>Product Quantity</td>
             <td>${this.properties.quantity}</td>
             </tr>
             <tr>
             <td>Bill Amount</td>
             <td>${this.properties.billamount=this.properties.productcost * this.properties.quantity}</td>
             </tr>
             <tr>
             <td>Discount</td>
             <td>${this.properties.discount=this.properties.billamount * 10/100 }</td>
             </tr>
             <tr>
             <td>Net Bill Amount</td>
             <td>${this.properties.netbillamount=this.properties.billamount * this.properties.discount}</td>
             </tr>
             <tr>
             <td>Is Certified? </td>
             <td>${this.properties.IsCertified}</td>
             </tr>
             <tr>
             <td>Rating </td>
             <td>${this.properties.Rating}</td>
             </tr>
             <tr>
             <td>Processor Type </td>
             <td>${this.properties.processortype}</td>
             </tr>
             <tr>
             <td>Invoice File Type </td>
             <td>${this.properties.InvoiceFileType}</td>
             </tr>
             </table>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges():boolean{
    return true;
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
                }),
                PropertyPaneTextField('productname', {
                  label: "Product Name",
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"Please enter the product name","description":"Name Property field"
                }),
                PropertyPaneTextField('productdescription', {
                  label: "Product Description",
                  multiline:true,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"Please enter the Product Description","description":"Name Property field"
                }),
                PropertyPaneTextField('productcost', {
                  label: "Product Cost",
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"Please enter the Product Cost","description":"Name Property field"
                }),
                PropertyPaneTextField('quantity', {
                  label: "Product Quantity",
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"Please enter the Product Quantity","description":"Name Property field"
                }),
                PropertyPaneToggle('IsCertified', {
                  key: "IsCertified",
                  label:"Is it Certified?",
                  onText:"Isi Certified!..",
                  offText:"Not an Isi certified product"

                }),
                PropertyPaneSlider('Rating', {
                  label: "Selct your Rating",
                  min:1,
                  max:10,
                  step:1,
                  showValue:true,
                  value:1
                }),
                PropertyPaneChoiceGroup('processortype', {
                  label: "Choices",
                  options:[
                    { key:'15',text:'Intel 15'},
                    { key:'17',text:'Intel 17',checked:true},
                    { key:'19',text:'Intel 19'}
                  ]
                }),
                PropertyPaneChoiceGroup('InvoiceFileType', {
                  label: "Select Invoice File Type",
                  options:[
                    { key:'MSWord',text:'MSWord',
                  imageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/docx_32x1.png',
                  imageSize:{width:32,height:32},
                  selectedImageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/docx_32x1.png'
                  },
                  { key:'MSExcel',text:'MSExcel',
                  imageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png',
                  imageSize:{width:32,height:32},
                  selectedImageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png'
                  },
                  { key:'MSPowerPoint',text:'MSPowerPoint',
                  imageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/pptx_32x1.png',
                  imageSize:{width:32,height:32},
                  selectedImageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/pptx_32x1.png'
                  },
                  { key:'OneNote',text:'OneNote',
                  imageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/one_32x1.png',
                  imageSize:{width:32,height:32},
                  selectedImageSrc:'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/one_32x1.png'
                  }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
