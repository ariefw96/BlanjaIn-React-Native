import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import CardBag from '../../components/cardBag'
import { Container, Header, Title, Content, Button, Left, Right } from "native-base";
import { connect } from 'react-redux'
import { BASE_URL } from '@env'
import axios from 'axios'

class Mybag extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        bagState: [],
        emptyBag: false
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (!this.props.auth.isLogin) {
                this.props.navigation.navigate('Login')
            }
            axios.get(BASE_URL + '/bag/getFromUser/' + this.props.auth.id)
                    .then(({ data }) => {
                        if (data.status == 200) {
                            this.setState({
                                bagState: data.data
                            })
                        } else {
                            this.setState({
                                emptyBag: true
                            })
                        }
                    }).catch(({ response }) => {
                        console.log(response.data)
                    })
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        const { bagState } = this.state
        let thisBag;
        if (this.state.emptyBag) {
            thisBag = <><Text>Cart anda masih kosong</Text></>
        } else {
            thisBag = <>
                {
                    bagState && bagState.map(({ id, product_name, color_name, size_name, qty, product_price }) => {
                        return (
                            <>
                                <CardBag itemsId={id} name={product_name} color={color_name} size={size_name} qty={qty} price={product_price} />
                            </>
                        )
                    })
                }
            </>
        }
        return (
            <>
                <Container style={{ backgroundColor: '#f0f0f0' }}>
                    <Header transparent style={{ backgroundColor: 'white' }}>
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
                        <View style={{ height: 400 }}>
                            <SafeAreaView>
                                <ScrollView>
                                    {thisBag}
                                </ScrollView>
                            </SafeAreaView>
                        </View>
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
                        <Button full rounded danger style={{ marginHorizontal: 10, marginBottom: 10 }}
                            onPress={() => { this.props.navigation.navigate('Checkout') }}
                        >
                            <View style={styles.btn}>
                                <Text style={{ color: '#fff' }}>CHECK OUT</Text>
                            </View>
                        </Button>
                    </View>
                </Container>
            </>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Mybag);

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: windowWidth * 0.04,
    },
    addcart: {
        position: 'absolute',
        borderTopEndRadius: 10,
        borderTopLeftRadius: 20,
        width: windowWidth,
        bottom: 0,
        top: undefined,
        backgroundColor: '#fff',
    },
});