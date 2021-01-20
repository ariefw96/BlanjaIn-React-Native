import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base'
import { BASE_URL } from "@env"

class CardBag extends Component {
    constructor(props) {
        super(props)
    }
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    render() {
        const { id, name, price, category, image } = this.props
        return (
            <View style={styles.container}>
                <Image source={{ uri: BASE_URL + image, width: 120, height: 120 }} style={styles.img} />
                <View style={styles.infobag}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom:30 }}>
                        <Text
                            style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, maxWidth: 175 }}
                        >
                           {name}
                        </Text>
                        <Button full rounded success style={{ width: 50, height: 20, marginTop: 5 }}
                            onPress={() => {
                                this.props.navigation.navigate('EditProduct', {
                                    itemId: this.props.id,
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700', fontSize: 12, color: '#FFF' }}>Edit</Text>
                        </Button>
                    </View>
                        <Text style={{ marginRight: 16, color: 'gray' }}>Category:
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{category}</Text>
                        </Text>
                    <View>
                        <Text style={{ fontFamily: 'Metropolis-Bold', fontWeight: 'bold', fontSize: 20 }}>Rp. {this.toPrice(price)}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default CardBag;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 120,
        marginBottom: 20,

    },
    img: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infobag: {
        backgroundColor: '#fff',
        width: 215,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        paddingHorizontal: 5,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
});