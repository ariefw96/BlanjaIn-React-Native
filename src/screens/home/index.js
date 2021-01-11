import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image
} from 'react-native';

import Card from './../../components/card'
import Banner from './../../components/banner'
// import {API_KEY, BASE_URL} from '@env'
const BASE_URL = ' https://42b6778beeff.ngrok.io'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            popular: []
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + '/products')
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    products: data.data.products
                })
            }).catch((error) => {
                console.log(error)
            })

    }

    render() {
        console.log(this.state)
        const { products } = this.state
        console.log(this.props.auth)
        return (
            <>
                <View style={{ flex: 1 }}>
                    <Banner navigation={this.props.navigation} />
                    <View style={{ height: 480 }}>
                        <SafeAreaView>
                            <ScrollView>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ height: 350, marginLeft: 10, marginRight: 10 }}>
                                        <Text>Selamat datang {this.props.auth.name}</Text>
                                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>New</Text>
                                        <Text style={{ color: 'gray', marginBottom: 15 }}>You've never seen it before!</Text>
                                        <SafeAreaView>
                                            <ScrollView
                                                horizontal={true}
                                            >
                                                {
                                                    products && products.map(({ product_id, product_name, product_price, product_img, category_name, color_name, size_name }) => {
                                                        let img = product_img.split(',')[0]
                                                        return (
                                                            <>
                                                                <Card new={true} navigation={this.props.navigation} product_name={product_name} product_price={product_price} product_img={img} keyId={product_id} category={category_name} color={color_name} size={size_name} />
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </SafeAreaView>
                                    </View>
                                    <View style={{ height: 350, marginLeft: 10, marginTop: 50, marginBottom: 40 }}>
                                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>Popular</Text>
                                        <Text style={{ color: 'gray', marginBottom: 15 }}>Find clothes that are trending recently</Text>
                                        <SafeAreaView>
                                            <ScrollView
                                                horizontal={true}
                                            >
                                                {
                                                    products && products.map(({ product_id, product_name, product_price, product_img, category_name, color_name, size_name }) => {
                                                        let img = product_img.split(',')[0]
                                                        return (
                                                            <>
                                                                <Card navigation={this.props.navigation} product_name={product_name} product_price={product_price} product_img={img} keyId={product_id} category={category_name} color={color_name} size={size_name} />
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </SafeAreaView>
                                    </View>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Home);