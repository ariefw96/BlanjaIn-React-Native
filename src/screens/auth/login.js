import React, { Component } from 'react';
import { Form, Item, Input, Label, Button, } from 'native-base';
import { setLogintrue, setName, setEmail, setId } from './../../utils/redux/ActionCreators/auth'
import { connect } from 'react-redux'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from 'axios'
import { BASE_URL } from '@env'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorForm: ''
    }

    Login = () => {
        if (this.state.email === '' || this.state.password === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi!'
            })
        } else {
            const data = {
                email: this.state.email,
                password: this.state.password
            }

            axios.post(BASE_URL + '/auth/login', data)
                .then(({ data }) => {
                    alert(data.message)
                    console.log(data.result)
                    this.setState({
                        errorForm: ''
                    })
                    this.props.dispatch(setLogintrue())
                    this.props.dispatch(setName(data.result.name))
                    this.props.dispatch(setEmail(data.result.email))
                    this.props.dispatch(setId(data.result.user_id))
                    this.props.navigation.navigate('Home')
                }).catch(({ response }) => {
                    console.log(response.data)
                    alert(response.data.msg)
                })
        }

    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.props.auth.isLogin) {
                this.props.navigation.navigate('Home')
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        console.log(this.state)
        const { email, password } = this.state
        const { auth } = this.props
        console.log(auth)
        console.log(BASE_URL)
        return (
            <>
                <View style={{ margin: 20 }}>
                    <Text>
                        {'\n'}
                    </Text>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Home') }}
                    >
                        <Image style={{ alignSelf: 'center' }}
                            source={require('./../../assets/Vector.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: 'red', alignSelf: "center" }}>Blanja</Text>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input name="password" value={password} onChangeText={(text) => { this.setState({ password: text }) }} secureTextEntry={true} />
                        </Item>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('ForgotPassword')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Forgot your password? -{'>'}</Text>
                        </TouchableOpacity>
                        <Button full rounded danger
                            onPress={this.Login}
                        >
                            <Text style={{ color: 'white' }}>Login</Text>
                        </Button>
                    </Form>
                    <TouchableOpacity style={{ alignSelf: "center", }}
                        onPress={() => {
                            this.props.navigation.navigate('Register')
                        }}
                    >
                        <Text>Dont have an account? Register Here</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{this.state.errorForm}</Text>
                </View>
            </>
        )
    }
}


const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Login);