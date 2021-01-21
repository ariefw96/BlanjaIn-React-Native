import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/cardHome'
import { Container, Header, Title, Content, Button, Left, Body, Right, Form, Item, Label, Input } from "native-base";
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


    getInitialData = () => {
        axios.get(BASE_URL + '/products')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    products: data.data.products,
                    pageInfo:data.data.pageInfo
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        this.getInitialData()
    }

    SearchItems = () => {
        axios.get(BASE_URL + '/products?name=' + this.state.searchKey)
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    products: data.data.products
                })
            }).catch((error) => {
                this.setState({
                    products: []
                })
                console.log(error)
            })
    }

    Refresh = () => {
        this.getInitialData()
    }

    render() {
        const { products, pageInfo } = this.state
        let searchResult;
        if(products.length > 0){
            searchResult = <>
            <ScrollView>
                        <View style={styles.grid} >
                            {
                                products && products.map(({ product_id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                                    let img = product_img.split(',')[0]
                                    return (
                                        <>
                                            <Card navigation={this.props.navigation} key={product_id} product_name={product_name} product_price={product_price} product_img={img} keyId={product_id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                        </>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
             </>
        }else{
            searchResult = <><Text style={{fontSize:24, fontWeight:'bold', marginLeft:15}}>Pencarian tidak ditemukan..</Text></>
        }
        return (
            <>
                <Header transparent style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 50, fontWeight: 'bold' }}>Search</Title>
                    </Body>
                </Header>
                <Container style={{ backgroundColor: '#f0f0f0' }}>
                    <Form style={{ marginBottom: 10 }}>
                        <Item floatingLabel>
                            <Label>Keyword</Label>
                            <Input name="searchKey" value={this.state.searchKey} onChangeText={(text) => { this.setState({ searchKey: text }) }} />
                        </Item>
                        <Button full rounded success small style={{ marginHorizontal: 15 }}
                            onPress={this.SearchItems}
                        >
                            <Text>Search Here...</Text>
                        </Button>
                    </Form>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginHorizontal:15}}>
                        <Text style={{ fontSize: 36 }}>
                            Here's for you
                    </Text>
                        <TouchableOpacity
                            onPress={this.Refresh}
                        >
                            <Text>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    {searchResult}
                </Container>
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