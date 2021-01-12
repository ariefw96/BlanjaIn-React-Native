import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/card'
import { Container, Header, Title, Content, Button, Left, Body, Right } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import {BASE_URL} from '@env'

class ShopCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
        }
        console.log(this.props)
    }


    componentDidMount = () => {
        if (this.props.route.params.categoryType === 'new') {
            console.log('saya klik new')
            axios.get(BASE_URL + '/products')
                .then(({ data }) => {
                    console.log(data)
                    this.setState({
                        products: data.data.products
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }else{
            axios.get(BASE_URL+'/products?category='+this.props.route.params.categoryType)
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    products: data.data.products
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    render() {
        const { products } = this.state
        return (
            <>
                <Header transparent style={{backgroundColor:'white'}}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
        <Title style={{ color: 'black', marginLeft: 50, fontWeight: 'bold' }}>{this.props.route.params.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Image source={require('../../assets/icons/Search.png')} />
                        </Button>
                    </Right>
                </Header>
                <Container style={{backgroundColor: '#f0f0f0'}}>
                    <View style={styles.filter}>
                        <Grid>
                            <Col>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Filter')}
                                >
                                    <Text style={styles.txtFilter}> Filter </Text>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity>
                                    <Text style={styles.txtFilter}> Sort </Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>




                    <ScrollView>
                        <View style={styles.grid} >
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
                        </View>
                    </ScrollView>
                </Container>
            </>
        );
    }
}

export default ShopCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: 10
    },
    filter: {
        marginLeft: 10,
        marginBottom: 10, flexDirection: 'row',
        justifyContent: 'center'
    },
    txtFilter: {
        fontSize: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DB3022",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    ctgTitle: {
        fontFamily: 'Metropolis-Bold',
        fontSize: 34,
        fontWeight: '700',
        marginTop: 5,

    },
    btnTitle: {
        color: '#fff',
        fontSize: 35,
    },
    btnSub: {
        color: '#fff',
        fontSize: 18,
    },
    card: {
        marginVertical: 10
    },
    cardTitle: {
        flex: 1,
        textAlign: 'center',
    }
});