import * as React from 'react';
import styles from './AnonymousApiWp.module.scss';
import { IAnonymousApiWpProps } from './IAnonymousApiWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AnonymousApiWp extends React.Component<IAnonymousApiWpProps, {}> {
  public render(): React.ReactElement<IAnonymousApiWpProps> {
    return (
      <div className={ styles.anonymousApiWp }>
       
              <span className={ styles.title }>User Details: </span>
             <div><strong>ID: </strong>{this.props.id}</div><br/>
             <div><strong>User Name: </strong>{this.props.username}</div><br/>
             <div><strong>Name: </strong>{this.props.name}</div><br/>
             <div><strong>Address: </strong>{this.props.address}</div><br/>
             <div><strong>Email: </strong>{this.props.email}</div><br/>
             <div><strong>Phone: </strong>{this.props.phone}</div><br/>
             <div><strong>Website: </strong>{this.props.website}</div><br/>
             <div><strong>Company: </strong>{this.props.company}</div><br/>
            </div>          
    );
  }
}
