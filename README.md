# BlanjaIn React-Native

## Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements-for-development)
- [Installation](#installation-for-development)
- [Screenshot](#screenshot)
- [Related Project](#related-project)

## Description

**BlanjaIn** is a app-based e-commerce application that allows buyers to order
products of their choice. Consists of 2 types of users, namely buyers and
sellers.

## Features

- Browsing items
- Order product
- History transaction
- Add or edit product (sellers only)
- Chat with seller
- Edit profile
- Reset Password
- etc

## Requirements for Development

- [`Node Js`](https://nodejs.org/en/)
- [`npm`](https://www.npmjs.com/get-npm)
- [`ReactNative`](https://reactnative.dev/)
- [`BlanjaIn Backend`](https://github.com/ariefw96/blanja-restAPI)

## Installation for Development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/ariefw96/blanjaIn-React-Native.git`
3. Open the folder and type `npm install` or `yarn install` for install dependencies from package.json
4. Create file **_.env_** in root directory with the following contents :

```bash
BASE_URL = "your_backend_API_URL"
```

Example :

- http://host_backend:port_backend is http://localhost:8000

so, you can write in .env file like this :

```bash
BASE_URL = "http://localhost:8000"
```

5. Before run this project, you must configure and run backend. You can find backend for this project [here](https://github.com/ariefw96/blanja-restAPI)
6. Type `npm run server` in terminal for running backend.
7. If you want to build this project, type `react-native start --reset-cache` then `react-native run-android`.

## Screenshot

# Here some display about the app

|  Home                |  Product Details                        |
|----------------------|-----------------------------------------|
|<img src="https://user-images.githubusercontent.com/70320451/108989389-1e5ed400-76c8-11eb-81a4-4a4517625488.jpg" width="450" />  |<img src="https://user-images.githubusercontent.com/70320451/108988908-9678ca00-76c7-11eb-8a10-2332cfe71a16.jpg" width="450" />             |

|  Chat                |  Shipping Address                       |
|----------------------|-----------------------------------------|
|<img src="https://user-images.githubusercontent.com/70320451/108989713-7ac1f380-76c8-11eb-98a8-b7d3142a6a8d.jpg" width="450" />  |<img src="https://user-images.githubusercontent.com/70320451/108989795-93320e00-76c8-11eb-8f17-39b5ac9ac547.jpg" width="450" />             |

|  My Order            |  Order Details                          |
|----------------------|-----------------------------------------|
| <img src="https://user-images.githubusercontent.com/70320451/108989916-b9f04480-76c8-11eb-977b-b44f44e1f6a5.jpg" width="450" />  |<img src="https://user-images.githubusercontent.com/70320451/108989955-c70d3380-76c8-11eb-8b4a-50802e8fe7f9.jpg" width="450" />|

## Related Project

**restful-API**


[`BlanjaIn-restAPI`](https://github.com/ariefw96/BlanjaIn-restAPI)

Other project

[`BlanjaIn (ReactJs)`](https://github.com/ariefw96/BlanjaIn-React)

