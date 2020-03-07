import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Footers from './Footers';
import axios from 'axios';
import {Content, Card, CardItem, Left, Right, Icon, Text} from 'native-base';

var res_id = '';
export default class Restaurant extends Component {
  static navigationOptions = ({navigation}) => {
    res_id = navigation.getParam('res_id');
    return {
      title: navigation.getParam('nama_restaurant'),
    };
  };

  constructor() {
    super();
    this.state = {
      DetailRestaurant: [],
    };
  }

  getDetailRestaurant() {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`,
        {
          headers: {user_key: '5f9fc976b65f5a2256e54bfdeb7e15b5'},
        },
      )
      .then(res => {
        this.setState({
          DetailRestaurant: res.data,
        });
      });
  }

  componentDidMount() {
    this.getDetailRestaurant();
  }

  render() {
    var alamat = {...this.state.DetailRestaurant.location};
    var rating = {...this.state.DetailRestaurant.user_rating};
    return (
      <View style={{flex: 1}}>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image
                style={{height: 240, width: null, flex: 1}}
                source={{uri: this.state.DetailRestaurant.featured_image}}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Text>Alamat Restaurant : {alamat.address}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="star" style={{backgroundColor: '#e1ee17'}} />
                <Text>{rating.aggregate_rating}</Text>
              </Left>
              <Right>
                <Icon name="chatbubbles" />
                <Text>{this.state.DetailRestaurant.all_reviews_count}</Text>
              </Right>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Left>
                <Text>
                  Jenis Masakan : {this.state.DetailRestaurant.cuisines}
                </Text>
              </Left>
            </CardItem>
          </Card>
        </Content>
        <Footers />
      </View>
    );
  }
}
