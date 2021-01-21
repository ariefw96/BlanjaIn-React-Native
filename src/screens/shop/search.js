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
            searchKey: '',
        }
    }

    getInitialData = () => {
        axios.get(BASE_URL + '/products')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    products: data.data.products
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
        const { products } = this.state
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

                    {/* <View style={styles.filter}>
                        <Grid>
                            <Col>
                                <TouchableOpacity
                                    // onPress={() => this.props.navigation.navigate('Filter')}
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
                    </View> */}

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button primary style={{ width: 100 }}
                            onPress={this.sortPriceAsc}
                        ><Text>Price Asc</Text></Button>
                        <Button success style={{ width: 100 }}
                            onPress={this.sortPriceDesc}
                        ><Text>Price Desc</Text></Button>
                    </View> */}

                    {searchResult}
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