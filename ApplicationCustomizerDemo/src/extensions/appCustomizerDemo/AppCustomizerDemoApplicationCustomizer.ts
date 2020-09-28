import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AppCustomizerDemoApplicationCustomizerStrings';
import styles from './ACDemo.module.scss';
const LOG_SOURCE: string = 'AppCustomizerDemoApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppCustomizerDemoApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom:string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppCustomizerDemoApplicationCustomizer
  extends BaseApplicationCustomizer<IAppCustomizerDemoApplicationCustomizerProperties> {

    private _topPlaceholder:PlaceholderContent | undefined;
    private _bottomPlaceholder:PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

   this.context.placeholderProvider.changedEvent.add(this,this._renderPlaceHolders);
   this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders():void{
console.log('Avaliable PlaceHolders are : ',
this.context.placeholderProvider.placeholderNames.map(
  placeholdername=>PlaceholderName[placeholdername]).join(', '));

  if(!this._topPlaceholder)
  {
    this._topPlaceholder=
    this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose});

      if(!this._topPlaceholder){
        console.error('The Placeholder Top was not found...');
        return;
      }
      if(this.properties)
      {
        let topString: string =this.properties.Top;
        if(!topString)
        {
          topString='(Top property was not defined...)';
        }

      if(this._topPlaceholder.domElement)
      {
        this._topPlaceholder.domElement.innerHTML=
        `<div class="${styles.appcustomapp}">
        <div class="ms-bgcolor-themeDark ms-fontColor-white ${styles.topPlaceholder}">
        <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}
        </div>
        </div>`;
      }
  }
}

if(!this._bottomPlaceholder)
  {
    this._bottomPlaceholder=
    this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Bottom,
      { onDispose: this._onDispose});

      if(!this._bottomPlaceholder){
        console.error('The Placeholder Bottom was not found...');
        return;
      }
      if(this.properties)
      {
        let bottomString: string =this.properties.Bottom;
        if(!bottomString)
        {
          bottomString='(Bottom property was not defined...)';
        }

      if(this._bottomPlaceholder.domElement)
      {
        this._bottomPlaceholder.domElement.innerHTML=
        `<div class="${styles.appcustomapp}">
        <div class="ms-bgcolor-themeDark ms-fontColor-white ${styles.bottomPlaceholder}">
        <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(bottomString)}
        </div>
        </div>`;
      }
  }
}

  }

  private _onDispose():void    {
    console.log('Disposed Custom top and bottom Place Holders..');
  }
}
