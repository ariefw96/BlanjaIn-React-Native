import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, CheckBox } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { orderItems } from './../../utils/redux/ActionCreators/bag'
import axios from 'axios'
import { BASE_URL } from '@env'

import CardAdress from './../../components/cardAdress'
const shippingPrice = 15000;

class CheckOut extends React.Component {
    state = {
        isCheckedMaster: false,
        isCheckedPost: false,
        isCheckedGopay: false,
        selectedPayment: 0,
        address: [],
    }

    checkedMaster = () => {
        this.setState({
            isCheckedMaster: !this.state.isCheckedMaster,
            isCheckedPost: false,
            isCheckedGopay: false,
        })
    }

    checkedPost = () => {
        this.setState({
            isCheckedMaster: false,
            isCheckedPost: !this.state.isCheckedPost,
            isCheckedGopay: false,
        })
    }

    checkedGopay = () => {
        this.setState({
            isCheckedMaster: false,
            isCheckedPost: false,
            isCheckedGopay: !this.state.isCheckedGopay,
        })
    }

    submitOrder = () => {
        let payment = 0
        if (this.state.isCheckedMaster) {
            payment = 1
        } else if (this.state.isCheckedPost) {
            payment = 2
        } else if (this.state.isCheckedGopay) {
            payment = 3
        }
        if (payment != 0 && this.props.address.activeAddress != null) {
            const Order = {
                trxId:`TRX00${this.props.bag.trxId}`,
                payment: payment,
                address: this.props.address.activeAddress
            }
            if (this.props.dispatch(orderItems(Order))) {
                const newTrx = {
                    user_id:this.props.auth.id,
                    TrxId: Order.trxId,
                    payment: payment,
                    address: this.props.address.activeAddress,
                    qty: this.props.bag.mybag.length,
                    total: this.props.bag.totalAmmount + shippingPrice,
                    trackingNumber: `XXXXXXXXXXXXXXX-0${this.props.bag.trxId}`
                }
                axios.post(BASE_URL+'/transaksi', newTrx)
                .then((result) =>{
                    axios.post(BASE_URL+'/transaksi/itemOrder', this.props.bag.mybag)
                    .then((res) =>{
                        alert('Transaksi Sukses')
                        this.props.navigation.navigate('Success')
                    }).catch(({response}) =>{
                        console.log(response.data)
                    })
                }).catch((error) =>{
                    console.log(error.response.data)
                })
            }

        }else{
            alert('Harap lengkapi alamat dan payment')
        }

    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            axios.get(BASE_URL + `/address/get/${this.props.address.activeAddress}`)
                .then(({ data }) => {
                    this.setState({
                        address: data.data
                    })
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        // console.log(this.props.bag.mybag[0])
        const { address } = this.state
        let cardAdress;
        if (this.props.address.activeAddress != null) {
            cardAdress =
                <>
                    <CardAdress key={address.id} addressId={address.id} name={address.recipient_name} city={address.city} postal={address.postal} phone={address.phone} navigation={this.props.navigation} />
                </>
        } else {
            cardAdress = <Text>Belum ada alamat terpilih</Text>
        }
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
                            <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>CheckOut</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Shipping Address</Text>

                            {cardAdress}

                            <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Payment</Text>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('./../../assets/icons/master.png')} style={{ width: 105, height: 88 }} />
                                <Text style={{ marginTop: 30, width: 120 }}>Master Card</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} checked={this.state.isCheckedMaster} onPress={this.checkedMaster} />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('./../../assets/icons/pos.png')} />
                                <Text style={{ marginTop: 30, width: 120 }}>Post Indonesia</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} checked={this.state.isCheckedPost} onPress={this.checkedPost} />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('./../../assets/icons/gopay.png')} />
                                <Text style={{ marginTop: 30, width: 120 }}>GoPay</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} checked={this.state.isCheckedGopay} onPress={this.checkedGopay} />
                            </View>
                        </View>



                        <View style={{ backgroundColor: 'white', height: 160, marginTop: 50, borderTopEndRadius: 10, borderTopLeftRadius: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 5 }}>
                                <Text style={{ width: 100, color: 'gray' }}>Order :</Text>
                                <Text>Rp. {this.props.bag.totalAmmount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 5 }}>
                                <Text style={{ width: 100, color: 'gray' }}>Shipping :</Text>
                                <Text>Rp. {shippingPrice}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 5 }}>
                                <Text style={{ width: 100, color: 'gray' }}>Summary :</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Rp. {this.props.bag.totalAmmount + shippingPrice}</Text>
                            </View>
                            <Button full rounded danger style={{ margin: 10 }}
                                onPress={this.submitOrder}
                            >
                                <Text style={{ color: 'white' }}>
                                    Submit Order
                            </Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth, address, bag }) => {
    return {
        auth,
        address,
        bag
    };
};

export default connect(mapStateToProps)(CheckOut);