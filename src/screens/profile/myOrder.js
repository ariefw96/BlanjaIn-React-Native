import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Left, Body, Text, Right, List, ListItem } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'

import CardOrder from './../../components/cardOrders'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '@env'
import { connect } from 'react-redux'
import axios from 'axios';

class Orders extends React.Component {
    state = {
        cardOrder: [],
    }
    getMyOrder = () => {
        axios.get(BASE_URL + '/transaksi/myTransaction/' + this.props.auth.id)
            .then(({ data }) => {
                this.setState({
                    cardOrder: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getMyOrder()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        const { cardOrder } = this.state
        console.log(this.state.cardOrder)
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
                            <Title style={{ color: 'black', marginLeft: 30, fontWeight: 'bold' }}>My Orders</Title>
                        </Body>

                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 15, marginRight: 10, marginTop: 20, marginBottom: 10 }}>My Orders</Text>
                        </View>
                        <SafeAreaView>
                            <ScrollView style={{ height: 480 }}>

                                {
                                    cardOrder && cardOrder.map(({trxId, trackingNumber, qty, total, created_at, status}) => {
                                        return (
                                            <>
                                                <CardOrder trxId={trxId} trackingNumber={trackingNumber} qty={qty} total={total} created_at={created_at} status={status} navigation={this.props.navigation} />
                                            </>
                                        )
                                    })
                                }

                            </ScrollView>
                        </SafeAreaView>
                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth, address }) => {
    return {
        auth,
        address
    };
};

export default connect(mapStateToProps)(Orders);
