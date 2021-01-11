import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardBag from './../../components/cardBag'
import { Container, Header, Title, Content, Button, Left, Body, Right } from "native-base";


export default class Mybag extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <Container style={{backgroundColor: '#f0f0f0'}}>
                    <Header transparent style={{backgroundColor:'white'}}>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Image source={require('./../../assets/search.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <View style={styles.container}>
                        <Text
                            style={{
                                fontFamily: 'Metropolis-Bold',
                                fontSize: 34,
                                fontWeight: '700',
                                marginTop: 15,
                                marginBottom: 24,
                            }}>My Bag</Text>
                        <CardBag />
                        <CardBag />
                        <CardBag />
                    </View>
                    <View style={styles.addcart}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
                                marginHorizontal: 10,
                                marginVertical: 20,
                            }}>
                            <Text style={{ fontFamily: 'Metropolis-Light', color: '#9B9B9B' }}>
                                Total amount:</Text>
                            <Text style={{ fontFamily: 'Metropolis-Bold' }}>112$</Text>
                        </View>
                        <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('Checkout')}}
                        >
                            <View style={styles.btn}>
                                <Text style={{ color: '#fff' }}>CHECK OUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Container>
            </>
        );
    }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: windowWidth * 0.04,
    },
    addcart: {
        position: 'absolute',
        bottom: 0,
        top: undefined,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: '#DB3022',
        width: windowWidth,
        height: 48,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 24,
    },
});