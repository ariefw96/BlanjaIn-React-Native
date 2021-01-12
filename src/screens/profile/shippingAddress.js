import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '@env'

import CardAdress from './../../components/cardAdress'

class Shipping extends React.Component {
    state = {
        shippingAddress: [],
    }

    getAddress = () => {
        axios.get(BASE_URL + `/address/${this.props.auth.id}`)
            .then(({ data }) => {
                this.setState({
                    shippingAddress: data.data
                })
            }).catch(({ response }) => {
                console.log(response)
            })
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getAddress()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        console.log(this.props.auth)
        const { shippingAddress } = this.state
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: 'black', fontWeight: 'bold' }}>My Shipping Address</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                        <Item rounded style={{ marginTop: 20, backgroundColor: 'white' }}>
                            <Input placeholder="Search Here" />
                        </Item>
                        <View>
                            <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Shipping Address</Text>
                        </View>
                        <SafeAreaView>
                            <ScrollView style={{ height: 380, marginBottom: 20, marginTop: -20 }}>
                                {
                                    shippingAddress && shippingAddress.map(({ id, recipient_name, city, postal, phone }) => {
                                        return (
                                            <>
                                                <CardAdress key={id} addressId={id} name={recipient_name} city={city} postal={postal} phone={phone} navigation={this.props.navigation} />
                                            </>
                                        )
                                    })
                                }
                            </ScrollView>
                        </SafeAreaView>

                        <Button full rounded bordered dark>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('AddAddress') }}
                            >
                                <Text>
                                    Add New Address
                            </Text>
                            </TouchableOpacity>
                        </Button>

                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Shipping);