import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import {API_KEY, BASE_URL} from '@env'


export default class Card extends React.Component {
    render() {
        let newBtn;
        if (this.props.new) {
            newBtn = <>
                <View style={{ position: 'absolute', left: 5, top: 5 }}>
                    <Button dark small rounded>
                        <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>NEW</Text>
                    </Button>
                </View>
            </>
        } else {

        }
        // console.log(this.props)

        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Details', {
                            itemId: this.props.keyId,
                        })
                    }}
                >
                    <View style={{ height: 320, marginRight: 15 }}>
                        <Image source={{ uri: BASE_URL + this.props.product_img, width: 156, height: 215 }} />
                        {newBtn}
                        <Image source={require('./../assets/rating.png')} style={{ marginTop: 5 }} />
                        <Text style={{ color: 'gray', marginTop: 5 }}>{this.props.category}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.props.product_name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Rp. {this.props.product_price}</Text>
                <Text>{this.props.size} - {this.props.color}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
}