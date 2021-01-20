import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, Label, Right } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import CardProduct from '../../../components/cardStock'
import { BASE_URL } from "@env"
import axios from 'axios'
import { connect } from 'react-redux'

class ListProduct extends React.Component {
    state = {
        products: []
    };

    getAllProducts = () => {
        axios
            .get(BASE_URL + `/product/sell/user/` + this.props.auth.id, {
                headers: {
                    "x-access-token": "Bearer " + this.props.auth.token
                },
            })
            .then(({ data }) => {
                console.log(data.data)
                this.setState({ products: data.data });
            })
            .catch((err) => console.error(err.response.data));
    };

    refresh = () =>{
        this.getAllProducts()
    }

    componentDidMount() {
        this.getAllProducts();
    }

    render() {
        const { products } = this.state;
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../../assets/icons/back.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: 'black', fontWeight: 'bold', marginLeft: 20 }}>My Selling Product</Title>
                        </Body>
                        <Right>
                        <Button transparent
                        onPress={this.refresh}
                        >
                            <Image source={require('./../../../assets/icons/refresh.png')} style={{width:24, height:24}} />
                        </Button>
                    </Right>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                        {
                            products && products.map(({ id, product_id, product_name, product_price, category_name, size_name, color_name, product_img }) => {
                                let img = product_img.split(',')[0];
                                // console.log(img);
                                return (
                                    <CardProduct id={id} product_id={product_id} name={product_name} price={product_price} category={category_name} size={size_name} color={color_name} image={img} navigation={this.props.navigation} />
                                )
                            })
                        }
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:15 }}>
                            <Button full rounded bordered dark style={styles.btn}>
                                <Text>Edit Product</Text>
                            </Button>
                            <Button full rounded bordered dark style={styles.btn}>
                                <Text>Edit Stock</Text>
                            </Button>
                        </View> */}
                    </Content>

                </Container>
            </>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 150
    }
})

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(ListProduct)