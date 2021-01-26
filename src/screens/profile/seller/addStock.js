import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Textarea, Left, Right, Body } from 'native-base';
import { BASE_URL } from "@env"
import axios from 'axios'
import { connect } from 'react-redux'

class AddStock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            product_name: [],
            product_id: '',
            size_id: 0,
            color_id: 0,
            condition_id: 0,
            qty: '',
            selectedProduct: 0
        }
    }

    getAllProducts = () => {
        axios
            .get(BASE_URL + `/product/user/` + this.props.auth.id, {
                headers: {
                    "x-access-token": "Bearer " + this.props.auth.token
                },
            })
            .then(({ data }) => {
                this.setState({ product_name: data.data });
            })
            .catch((err) => console.error(err.response.data));
    };

    setProduct = (e) => {
        this.setState({
            selectedProduct: e
        })
    }

    setSize = (e) => {
        this.setState({
            size_id: e
        })
    }

    setColor = (e) => {
        this.setState({
            color_id: e
        })
    }

    setCondition = (e) => {
        this.setState({
            condition_id: e
        })
    }

    addStock = () => {
        const data = {
            user_id:this.props.auth.id,
            product_id: this.state.selectedProduct,
            size_id: this.state.size_id,
            color_id: this.state.color_id,
            condition_id: this.state.condition_id,
            qty: this.state.qty
        }

        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                "x-access-token": "Bearer " + this.props.auth.token
            },
        }

        console.log(data)

        axios.post(BASE_URL + '/product/addStock', data, config)
            .then(({ data }) => {
                alert(data.data.msg)
                this.props.navigation.navigate('SellingProduct')
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        this.getAllProducts()
    }


    render() {
        const { product_name, size_id, color_id, qty, selectedProduct, } = this.state
        console.log(product_name)
        // console.log(this.state)
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('./../../../assets/back.png')} />
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                        <Button transparent>
                            <Image source={require('./../../../assets/search.png')} />
                        </Button>
                    </Right>
                </Header>
                <Content style={{marginHorizontal:10, backgroundColor:'white'}}>
                    <View style={styles.rowTitle}>
                        <Text style={styles.textTitle}>Add Product Stock</Text>
                    </View>
                    <ScrollView>
                        <View style={{ marginTop: 5 }}>
                            <Form>
                                <Label >Choose Product :</Label>
                                {/* <Input name="product_name" value={product_name} /> */}
                                <TouchableOpacity>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={selectedProduct}
                                            onValueChange={(itemValue, itemIndex) => this.setProduct(itemValue)}
                                        >
                                            <Picker.Item label="Product" value="0" style={{ backgroundColor: 'gray' }} />
                                            {
                                                product_name && product_name.map(({ id, product_name }) => {
                                                    return <Picker.Item label={product_name} value={id} />
                                                })
                                            }

                                        </Picker>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={size_id}
                                            onValueChange={(itemValue, itemIndex) => this.setSize(itemValue)}
                                        >
                                            <Picker.Item label="Size" value="0" style={{ backgroundColor: 'gray' }} />
                                            <Picker.Item label="XS" value="1" />
                                            <Picker.Item label="S" value="2" />
                                            <Picker.Item label="M" value="3" />
                                            <Picker.Item label="L" value="4" />
                                            <Picker.Item label="XL" value="5" />
                                        </Picker>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={color_id}
                                            onValueChange={(itemValue, itemIndex) => this.setColor(itemValue)}
                                        >
                                            <Picker.Item label="Color" value="0" />
                                            <Picker.Item label="Red" value="1" />
                                            <Picker.Item label="Green" value="2" />
                                            <Picker.Item label="Blue" value="3" />
                                            <Picker.Item label="Black" value="4" />
                                        </Picker>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={this.state.condition_id}
                                            onValueChange={(itemValue, itemIndex) => this.setCondition(itemValue)}
                                        >
                                            <Picker.Item label="Condition" value="0" />
                                            <Picker.Item label="New" value="1" />
                                            <Picker.Item label="Second" value="2" />
                                        </Picker>
                                    </View>
                                </TouchableOpacity>
                                <Item floatingLabel>
                                    <Label >Quantity</Label>
                                    <Input name="quantity" value={qty} onChangeText={(text) => { this.setState({ qty: text }) }} />
                                </Item>
                            </Form>
                            <Button danger full rounded style={{ marginTop: 15 }}
                                onPress={this.addStock}
                            >
                                <Text style={{ color: '#fff' }}> SUBMIT </Text>
                            </Button>
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(AddStock);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginTop: 25
    },
    rowTitle: {
        marginVertical:10
    },
    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    },
    size: {
        width: '100%',
        height: 40,
        // paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#9B9B9B',
        paddingHorizontal: 5,
        paddingBottom: 15
    },
})