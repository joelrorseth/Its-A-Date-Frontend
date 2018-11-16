import React from 'react';
import { Button } from 'react-native';

export default class IADLargeButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button 
        title={this.props.title}
        color={(this.props.color ? this.props.color : 'blue')}
      />
    );
  }
}