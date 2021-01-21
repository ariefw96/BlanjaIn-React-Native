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

import Card from '../../components/cardHome'
import Banner from './../../components/banner'
import Splash from './../splash'
import { BASE_URL } from '@env'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            popular: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + '/products')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    products: data.data.products
                })
            }).catch((error) => {
                // console.log(error.response)
            })
        axios.get(BASE_URL + '/products?sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    popular: data.data.products,
                    loading: false
                })
            }).catch((error) => {
                // console.log(error.response)
            })
    }

    Refresh = () =>{
        axios.get(BASE_URL + '/products')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    products: data.data.products
                })
            }).catch((error) => {
                // console.log(error.response)
            })
        axios.get(BASE_URL + '/products?sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    popular: data.data.products,
                    loading: false
                })
            }).catch((error) => {
                // console.log(error.response)
            })
    }

    render() {
        // console.log(this.state)
        const { products, popular } = this.state
        let Home;
        if (this.state.loading) {
            Home = <Splash navigation={this.props.navigation} />
        } else {
            Home =
                <>
                    <View style={{ flex: 1 }}>
                        <Banner navigation={this.props.navigation} />
                        <View style={{ height: 480 }}>
                            <SafeAreaView>
                                <ScrollView>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ height: 350, marginLeft: 10, marginRight: 10 }}>
                                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>New</Text>
                                            <TouchableOpacity
                                            onPress={this.Refresh}
                                            >
                                            <Text>Refresh Page</Text>
                                            </TouchableOpacity>

                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'gray', marginBottom: 15 }}>You've never seen it before!</Text>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                                                    <Text>View All</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <SafeAreaView>
                                                <ScrollView
                                                    horizontal={true}
                                                >
                                                    {
                                                        products && products.map(({ product_id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                                                            let img = product_img.split(',')[0]
                                                            return (
                                                                <>
                                                                    <Card new={true} key={product_id} navigation={this.props.navigation} product_name={product_name} product_price={product_price} product_img={img} keyId={product_id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
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
                                                        popular && popular.map(({ product_id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                                                            let img = product_img.split(',')[0]
                                                            return (
                                                                <>
                                                                    <Card navigation={this.props.navigation} key={product_id} product_name={product_name} product_price={product_price} product_img={img} keyId={product_id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
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
        }
        return (
            <>
                {Home}
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