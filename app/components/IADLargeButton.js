import React from 'react';
import { Button } from 'react-native';

export default class IADLargeButton extends React.Component {

  constructor(props) {
    super(props);
  }

  // Component render implementation
  render() {
    return (
      <Button
        title={this.props.title}
        disabled={this.props.disabled ? this.props.disabled : false}
        color={(this.props.color ? this.props.color : 'blue')}
        onPress={this.props.onPress}
      />
    );
  }
}