import React, {Component} from "react";

import Footers from "../Footers";
import {View, StatusBar, Image, TouchableOpacity} from "react-native";
import ImageSlider from "react-native-image-slider";
import {Content, Text, Button, Card, CardItem, Left, Right, Icon} from "native-base";
import axios from "axios";


export default class Homes extends Component{

    constructor(){
        super();
        this.state={
            images:[
                "https://images.pexels.com/photos/1161468/pexels-photo-1161468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            dataCategory:[],
            dataRestaurant:[]
        };
    }

    static navigationOptions = {header:null};

    getDataCategory=()=>{
        axios.get(`https://developers.zomato.com/api/v2.1/categories`,{headers:{"user-key":"5f9fc976b65f5a2256e54bfdeb7e15b5"}})
        .then((res)=>{
            this.setState({
                dataCategory:res.data.categories
            });
        });
    };

    getDataRestaurant=()=>{
        axios.get(`https://developers.zomato.com/api/v2.1/search?start=6&count=10&sort=rating`,{headers:{"user-key":"5f9fc976b65f5a2256e54bfdeb7e15b5"}})
        .then((res)=>{
            this.setState({
                dataRestaurant:res.data.restaurants
            });
        });
    };

    componentDidMount(){
        this.getDataCategory();
        this.getDataRestaurant();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#1c4ae3" />
                {
                    //Image Slider
                }
                <Content>
                <View style={{height:150}}>
                    <ImageSlider images={this.state.images} autoPlayWithInterval={3000} />
                </View>
                {
                    //Category
                }
                <Text style={{marginTop:20,marginLeft:10}}>Pilihan Category</Text>
                <Content horizontal style={{marginTop:20}}>
                {this.state.dataCategory.map((data,key)=>{
                    return(
                        <Button rounded key={key} style={{margin:10}}>
                            <Text>{data.categories.name}</Text>
                        </Button>
                    );
                })}
                </Content>

                {
                    //Restaurant Terbaik
                }

                <Text style={{marginTop:20,marginLeft:10}}>Restaurant Terbaik</Text>

                {this.state.dataRestaurant.map((data,key)=>{

                    var image ="";
                    if(data.restaurant.thumb===""){
                        image="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
                    }else{
                        image=data.restaurant.thumb
                    }

                    return(
                        <TouchableOpacity key={key} onPress={()=>{this.props.navigation.navigate("Restaurant", 
                        {nama_restaurant:data.restaurant.name, res_id:data.restaurant.R.res_id
                        })}}>
                        <Card>
                            <CardItem>
                                <Text>
                                    {data.restaurant.name}
                                </Text>
                            </CardItem>
                            <CardItem cardBody>
                                <Image style={{height:200,width:null, flex:1}} 
                                source={{uri: image
                                }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Icon style={{color:"#f7ce31"}} name="star" />
                                    <Text>{data.restaurant.user_rating.aggregate_rating}</Text>
                                </Left>
                                <Right>
                                    <Text>{data.restaurant.user_rating.rating_text}</Text>
                                </Right>
                            </CardItem>
                        </Card>
                        </TouchableOpacity>
                    )
                })}

                </Content>
                <Footers />
            </View>
        );
    }
}