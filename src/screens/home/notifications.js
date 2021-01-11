import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Footer, FooterTab, Icon, Left, Body, Text, View } from "native-base";
import { Image } from 'react-native'


export default class HeaderTransparent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container >
        <Header transparent>
          <Left>
            <Button transparent
              onPress={() => { this.props.navigation.goBack() }}
            >
              <Image source={require('./../../assets/back.png')} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'black', marginLeft: 25, fontWeight: 'bold' }}>Notification</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: '#f0f0f0' }}>
          <View style={{ marginTop:'60%', alignItems: 'center' }}>
            <Image source={require('./../../assets/no_notification.png')} />
            <Text>No Notification</Text>
          </View>
        </Content>
      </Container>
    );
  }
}