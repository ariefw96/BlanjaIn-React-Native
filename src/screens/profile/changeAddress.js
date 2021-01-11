import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, Label } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class ChangeAddress extends React.Component {
    render() {
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
                            <Title style={{ color: 'black', fontWeight: 'bold' }}>Change Address</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                        <View style={{ height: 130, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                            <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                                <Label style={{ fontSize: 14, color: 'green' }}>Save address as (ex: home address, office address)</Label>
                                <Input value='Rumah' />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                                <Label style={{ fontSize: 14, }}>Recipent Name</Label>
                                <Input />
                            </Item>
                        </View>
                        <View style={{ height: 195, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                            <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                                <Label style={{ fontSize: 14 }}>Address</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                                <Label style={{ fontSize: 14, }}>City or Subdistrict</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                                <Label style={{ fontSize: 14, }}>Postal Code</Label>
                                <Input />
                            </Item>
                        </View>
                        <View style={{ height: 75, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
                            <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                                <Label style={{ fontSize: 14, color: 'gray' }}>Recipient Telephone Number</Label>
                                <Input />
                            </Item>
                        </View>
                        <Button full rounded danger>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('Shipping') }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Save Address
                            </Text>
                            </TouchableOpacity>
                        </Button>

                    </Content>
                </Container>
            </>
        )
    }
}