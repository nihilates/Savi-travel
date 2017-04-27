import React, { Component } from 'react';
import Styles from '../../styles/styles.js';
import config from '../config/config.js';
import {
  Text,
  Button,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ScrollView
} from 'react-native';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillMount() {
    fetch('https://savi-travel.com:'+config.port+'/api/cities')
      .then(resp => resp.json())
      .then(data => this.setState({data}))
      .catch(err => console.error(err));
  }

  render() {
    let {width, height} = Dimensions.get('window');
    // let port = 8080; //replaced with config method
    // let imgUri = `https://savi-travel.com:${port}/api/images/`;
    let imgUri = 'https://savi-travel.com:'+config.port+'/api/images/';
    return (
      <View>
        <ScrollView>
          <Text style={Styles.components.logo}>Savi Travel</Text>
            {this.state.data.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableHighlight
                    onPress={() => {this.props.nav(1, item)}}
                  >
                    <Image source={{uri: imgUri + item.mainImage}}
                      style={{width: width, height: height / 3, margin: 0}}
                    >
                    <View style={Styles.components.cityTitlesView}>
                      <Text style={Styles.components.cityTitlesText}>{item.name}</Text>
                    </View>
                    </Image>

                  </TouchableHighlight>
                </View>
              )
            })}
        </ScrollView>
      </View>
    );
  }
}

export { HomePage };
