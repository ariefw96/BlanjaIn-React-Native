import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/home';
import Profile from './screens/profile';
import Login from './screens/auth/login';
import Shop from './screens/shop';
import Bag from './screens/mybag';
import DetailPage from './screens/details' 
import Signup from './screens/auth/register';
import Forgot from './screens/auth/forgot_password'
import Categories from './screens/Categories'
import Order from './screens/order'
import Shipping from './screens/shippingAdress'
import Setting from './screens/setting'
import ChangeAddress from './screens/changeAddress'
import AddAddress from './screens/addShippingAddress'
import DetailOrders from './screens/detailOrders'
import Filter from './screens/filter'
import Notification from './screens/notifications'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = ({auth}) => {
  return (
    <Tab.Navigator
      headerMode="none"
      sceneContainerStyle={{ borderWidth: 0 }}
      barStyle={{ borderTopLeftRadius: 20 }}
      tabBarOptions={{
        activeTintColor: '#DB3022',
        style: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="home" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopPage}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="shopping-cart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MyBag"
        component={Bag}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="shopping-bag" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="heart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MainProfile}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="user-circle-o" size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const ShopPage = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Filter" component={Filter} />
    </Stack.Navigator>
  );
};

const MainProfile = () => {
  return (
    <Stack.Navigator initialRouteName="MainProfile" headerMode="none">
            <>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Orders" component={Order} />
            <Stack.Screen name="DetailsOrders" component={DetailOrders} />
            <Stack.Screen name="Shipping" component={Shipping} />
            <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
            <Stack.Screen name="AddAddress" component={AddAddress} />
            <Stack.Screen name="Setting" component={Setting} />
            </>    
    </Stack.Navigator>
  );
};

const appRouter = () => {

  return (
    <>
      
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Tab" component={MyTabs} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="DetailPage" component={DetailPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
      
    </>
  );
};

export default appRouter
// import React, { Component } from 'react';
// import { createStackNavigator } from '@react-navigation/stack'
// const Stack = createStackNavigator()
// import Home from './screens/home'
// import Login from './screens/auth/login'
// import Register from './screens/auth/register'
// import Activate from './screens/auth/activate'
// import Forgot from './screens/auth/forgot_password'
// import OTP from './screens/auth/otp'
// import Reset from './screens/auth/reset_password'
// import Notification from './screens/notifications'
// import Details from './screens/details'
// import Profile from './screens/profile'
// import Order from './screens/order'
// import Shipping from './screens/shippingAdress'
// import Setting from './screens/setting'
// import ChangeAddress from './screens/changeAddress'
// import AddAddress from './screens/addShippingAddress'
// import Success from './screens/success'
// import Checkout from './screens/checkout'
// import DetailOrders from './screens/detailOrders'
// import Filter from './screens/filter'
// import MyBag from './screens/mybag'
// import Shop from './screens/shop'
// import Categories from './screens/Categories'
// import { connect } from 'react-redux'

// class Routes extends Component {
//     render() {
//         return (
//             <>
//                 <Stack.Navigator screenOptions={{
//                     headerShown: false
//                 }}>
//                     {/* {this.props.auth.isLogin ? (<> */}
//                     <Stack.Screen name="Home" component={Home} />
//                     <Stack.Screen name="Notification" component={Notification} />
//                     <Stack.Screen name="Details" component={Details} />
//                     <Stack.Screen name="Profile" component={Profile} />
//                     <Stack.Screen name="Orders" component={Order} />
//                     <Stack.Screen name="Shipping" component={Shipping} />
//                     <Stack.Screen name="Setting" component={Setting} />
//                     <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
//                     <Stack.Screen name="AddAddress" component={AddAddress} />
//                     <Stack.Screen name="Success" component={Success} />
//                     <Stack.Screen name="Checkout" component={Checkout} />
//                     <Stack.Screen name="DetailsOrders" component={DetailOrders} />
//                     <Stack.Screen name="Filter" component={Filter} />
//                     <Stack.Screen name="MyBag" component={MyBag} />
//                     <Stack.Screen name="Shop" component={Shop} />
//                     <Stack.Screen name="Categories" component={Categories} />
//                     {/* </>)
//                         : (<> */}
//                     {/* <Stack.Screen name="Home" component={Home} /> */}
//                     <Stack.Screen name="Login" component={Login} />
//                     <Stack.Screen name="Register" component={Register} />
//                     <Stack.Screen name="Activate" component={Activate} />
//                     <Stack.Screen name="ForgotPassword" component={Forgot} />
//                     <Stack.Screen name="Otp" component={OTP} />
//                     <Stack.Screen name="ResetPassword" component={Reset} />
//                     {/* </>)} */}
//                 </Stack.Navigator>
//             </>
//         );
//     }
// }
// const mapStateToProps = ({ auth }) => {
//     return {
//         auth
//     };
// };

// export default connect(mapStateToProps)(Routes);