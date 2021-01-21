import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, ProgressViewIOS } from 'react-native';
import Card from '../../components/cardHome'
import { Container, Header, Title, Content, Button, Left, Body, Right } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import { BASE_URL } from '@env'

class ShopCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            pageInfo: {},
            currentPage: '',
            intialPage:''
        }
    }

    nextPage = () => {
        const nextPage = this.state.pageInfo.nextpage
        if (nextPage != null) {
            axios.get(BASE_URL + '/' + nextPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                        currentPage: '/' + nextPage
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    prevPage = () => {
        const prevPage = this.state.pageInfo.previousPage
        if (prevPage != null) {
            axios.get(BASE_URL + '/' + prevPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                        currentPage: '/' + prevPage
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }


    componentDidMount = () => {
        if (this.props.route.params.categoryType === 'new') {
            // console.log('saya klik new')
            axios.get(BASE_URL + '/products')
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                        currentPage: '/products',
                        intialPage:'/products'
                    })
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            axios.get(BASE_URL + '/products?category=' + this.props.route.params.categoryType)
                .then(({ data }) => {
                    // console.log(data)
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                        currentPage: '/products?category=' + this.props.route.params.categoryType,
                        intialPage:'/products?category=' + this.props.route.params.categoryType

                    })
                }).catch((error) => {
                    console.log(error.response.data)
                })
        }
    }

    sortPriceAsc = () => {
        const sortingProduct = this.state.intialPage !='/products'?'&':'?'
        axios.get(BASE_URL + this.state.intialPage+ sortingProduct+'sortBy=product_price&orderBy=asc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    sortPriceDesc = () => {
        const sortingProduct = this.state.intialPage !='/products'?'&':'?'
        axios.get(BASE_URL + this.state.intialPage+ sortingProduct+'sortBy=product_price&orderBy=desc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { products, pageInfo } = this.state
        console.log(this.state.currentPage)
        return (
            <>
                <Header transparent style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 50, fontWeight: 'bold' }}>{this.props.route.params.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => this.props.navigation.navigate('Search')}
                        >
                            <Image source={require('../../assets/icons/Search.png')} />
                        </Button>
                    </Right>
                </Header>
                <Container style={{ backgroundColor: '#f0f0f0' }}>
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button full small rounded bordered
                            onPress={this.sortPriceAsc}
                        ><Text>Price Asc</Text></Button>
                        <Button full small rounded bordered
                            onPress={this.sortPriceDesc}
                        ><Text>Price Desc</Text></Button>
                    </View>
                            </Col>
                        </Grid>
                    </View>

                    <ScrollView>
                        <View style={styles.grid} >
                            {
                                products && products.map(({ product_id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                                    let img = product_img.split(',')[0]
                                    return (
                                        <>
                                            <Card navigation={this.props.navigation} product_name={product_name} product_price={product_price} product_img={img} keyId={product_id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                        </>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button full small rounded bordered
                            onPress={this.prevPage}
                        >
                            <Text>{`<< `}Prev</Text>
                        </Button>
                        <Button full small rounded bordered style={{ width: 200 }}>
                            <Text>{pageInfo.currentPage}</Text>
                        </Button>
                        <Button small rounded bordered
                            onPress={this.nextPage}
                        >
                            <Text>Next {`>> `}</Text>
                        </Button>
                    </View>
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