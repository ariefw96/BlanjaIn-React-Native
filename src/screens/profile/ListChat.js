import React, { useState, useEffect } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "@env"

const ListChat = ({ navigation }) => {
    const auth = useSelector((state) => state.auth)
    const [chatList, setChatList] = useState([])

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const ChatRoom = () => {
        if (auth.level == 2) {
            axios.get(BASE_URL + `/chat/chatRoomSeller`, config)
                .then(({ data }) => {
                    console.log(data)
                    setChatList(data.data)
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        } else {
            axios.get(BASE_URL + `/chat/chatRoomBuyer`, config)
                .then(({ data }) => {
                    console.log(data)
                    setChatList(data.data)
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        }
    }
    useEffect(() => {
        ChatRoom()
    }, [])
    return (
        <>
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { navigation.goBack() }}
                        >
                            <Image source={require('./../../assets/back.png')} />
                        </Button>
                    </Left>
                    <Body ><Text style={{ fontWeight: 'bold' }}>Chat List</Text></Body>
                </Header>
                <Content>
                    {
                        chatList.map(({ chatRoom }) => {
                            return (
                                <>
                                    <View>
                                        <Button full rounded
                                            onPress={() => {
                                                navigation.navigate('ChatRoom', {
                                                    room_id: chatRoom
                                                })
                                            }}
                                        >
                                            <Text>{chatRoom}</Text>
                                        </Button>
                                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                                            onPress={() => {
                                                navigation.navigate('ChatRoom', {
                                                    room_id: chatRoom
                                                })
                                            }}
                                        >

                                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{chatRoom}</Text>
                                                <Text style={{ color: 'gray', marginBottom: 10 }}>Chat With Other Person ( BETA )</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )
                        })
                    }
                </Content>
            </Container>
        </>
    )


}

export default ListChat


