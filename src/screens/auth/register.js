import React, { Component } from 'react';
import { Form, Item, Input, Label, Button, Toast } from 'native-base';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env'

class Register extends React.Component {
    state = {
        fullname: '',
        email: '',
        password: '',
        errorForm: '',
    }

    Register = () => {
        if (this.state.fullname === '' || this.state.email === '' || this.state.password === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi'
            })
        } else {
            const data = {
                email: this.state.email,
                password: this.state.password,
                fullname: this.state.fullname,
                level_id: 1,
            }
            console.log(data)
            axios.post(BASE_URL + '/auth/signup', data)
                .then(({ data }) => {
                    this.setState({
                        errorForm: ''
                    })
                    console.log(data)
                    alert(data.message)
                    this.props.navigation.navigate('Login')
                }).catch((error) => {
                    console.log(error.response.data.msg)
                    alert(error.response.data.msg)
                })
        }

    }


    render() {
        let { fullname, email, password } = this.state
        console.log(this.state)
        console.log(BASE_URL)
        return (
            <>
                <View style={{ margin: 20 }}>
                    <Text>
                        {'\n'}
                    </Text>
                    <Image style={{ alignSelf: 'center' }}
                        source={require('./../../assets/Vector.png')}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: 'red', alignSelf: "center" }}>Blanja</Text>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input name="password" secureTextEntry={true} value={password} onChangeText={(text) => { this.setState({ password: text }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Fullname</Label>
                            <Input name="firstname" value={fullname} onChangeText={(text) => { this.setState({ fullname: text }) }} />
                        </Item>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Login')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already have an account, Login here -{'>'}</Text>
                        </TouchableOpacity>
                        <Button full rounded danger
                            onPress={this.Register}>
                            <Text style={{ color: 'white' }}>Register</Text>
                        </Button>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Activate')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already register? Activate your account here -{'>'}</Text>
                        </TouchableOpacity>
                    </Form>
                    <Text style={{color:'red', fontWeight:'bold', textAlign:'center'}}>{this.state.errorForm}</Text>
                </View>
            </>
        )
    }
}
export default Register;