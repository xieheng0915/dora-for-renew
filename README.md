# Table of Contents

* [DORA Coin](#dora-coin)
  * [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installing](#installing)
      * [Database Setup](#database-setup)
      * [Source Code](#source-code)
  * [Deployment](#deployment)
  * [Built With](#built-with)
  * [Tasks](#tasks)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments](#acknowledgments)

---

# DORA Coin

ICO website of Cryptocurrency DORA Coin

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Nodejs 8.11.1+
* MySQL

<!-- ```
Give examples
``` -->

### Installing

A step by step series of examples that tell you have to get a development env running

#### Database Setup

* dbname: dora_coin_dev
* username: dora_coin
* password: secret
* host: localhost
* port: 3306

Or change in **dora-coin/config/datastores.js** file.

Sample configuration

> `url: 'mysql://dora_coin:secret@localhost:3306/dora_coin_dev'`

<!--
```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo -->

#### Source Code

```bash
git clone https://github.com/Blue-Wall-Japan/dora-coin.git
cd dora-coin
git checkout develop
npm install
sails lift
```

* Check _http://localhost:1337_ on browser

<!-- ## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
``` -->

## Deployment

1. Put source code on server and run `npm install` to install dependencies.
2. Set `NODE_ENV` environment variable to `production`
3. Set `DATABASE_URL`, `COINPAYMENTS_PUBLIC_KEY`, `COINPAYMENTS_SECRET_KEY` env variables
4. Run `npm run build`
5. Run `npm start`

### Deployment with Dokku

I installed [dokku](https://github.com/dokku/dokku) on `http://ec2-18-179-119-193.ap-northeast-1.compute.amazonaws.com/` and deployed this branch with app name `dorcoin`.

To deploy there, follow these steps:

1. Have a server admin add your public ssh key ([instructions here](https://github.com/dokku/dokku/blob/master/docs/deployment/user-management.md))
2. Add the server as git remote: `git remote add dor-dokku dokku@ec2-18-179-119-193.ap-northeast-1.compute.amazonaws.com:dorcoin`
3. Start deployment process: `git push dor-dokku dorcoin-develop:master`

## Built With

* [Sails](https://sailsjs.com/) - The web framework used

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

<!-- ## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). -->

## Tasks

* [ ] Payment Process (Buy, Transfer, Withdrawal, Bonus)
* [ ] To change to Professional Design Template
* [ ] To create manual for deployment

## Authors

* [**Blue Internet Myanmar Co., Ltd.**](http://blueinternet-mm.com/)

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

## License

* **Please help to decide which licence to use**

<!-- This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->

## Acknowledgments

* Hat tip to anyone who's code was used
* **Zoyo_themes** - Author of [Bootstrap Template](https://themeforest.net/item/tripaco-responsive-coming-soon-template/17910903) Used
