# Supply Chain Dapp

The supply chain Dapp is a simple version of getting more information about a product using Blockchain. A contract is required to add products in the blockchain. Once a contract is deployed, users can add the products into the blockchain. As the blocks are read only, the end user/customer can trust the historical data which can be never altered in any way, shape or form. You can add subsequent blocks to the blochain to the products state in the real world.

This app is a tiny part of the huge idea of a fully functioning blockchain for product registration.

In this application:
1. An end user can _Deploy Contract_
2. Get products from the _Database_
3. View extra information for the product entries in the _Database_
4. Add new products to the _Blockchain_ and _Database_
5. Get the new products list in the _Database_ and _Blockchain_

## Project architecture

The project is structure as microservice based architecture (Not with Kafka/RabbitMQ) as the project is tiny. As the project gets expanded, a message queue can be added optionally.


```bash
├── supply-blockchain
│   ├── client
│   │   ├── React app
│   ├── dbserver
│   │   ├── Service to talk to DB
│   ├── server
│   │   ├── Service to talk to Blockchain
├── .gitignore
├── README.md
├── blockchain.sh
├── dbserver.sh
├── frontendscript.sh
└── script.sh
```

### Following libraries/resources are used to build the project

- Kaleido Developer Challenge Repo
- Node
- Sequelize ORM
- PostgreSQL
- React
- Material UI library

## How to run the project

- Use the link to setup Kaleido Blockchain [Click Here](https://github.com/kaleido-io/developer-challenge/blob/master/README.md#setting-up-your-kaleido-blockchain)
- Change the environment variables filename `dbserver->.env.template` to `.env`
- Once all the configurations are added in the `server->config.js` file go ahead and run the `script.sh` script to spin up database, frontend and backend servers. 

### User interaction

- Once the react app runs go to `loocalhost:3000` in a browser (In case, if the script does not open this up automatically)
- Click on `DEPLOY CONTRACT` button.
- This will generate a contract and the SOLIDITY file would persist 5 products in the database.
- Click on the `GET DB DATA` to retrieve the values from DB. Seeders should have been run in the shell script `dbserver.sh`.
- Click on the `VIEW` button to see more details of the product. This will make a GET request to the blockchain and you should be able to see more product information.
- Click on the `+` Floating action button to open register a new product and persist data to the blockchain.
- Fill the form and click on the `Register a new product` button.
- This will make a POST request to the `Blockchain server` that will update the database as well with the primary key. Note that the product details are not stored in this database as those would be retrieved later from the blockchain. However, the product id and product name are saved in the database to reference those in the products table from the UI. 
- Now click on the `GET DB DATA` button to fetch the updated list of products from the database.
- Click on the `VIEW` button in the newly added product list, this will make a GET request to the Blockchain and you should see more information that was previously added in the registration form.
- Thats it 🙂

## Demo:

![](demo.gif)

## Known issues
- Database is not cleared when the contract is redeployed, and causes blockchain to return `No data`.
- The contract Address will be lost upon refreshing the page. In this case, a new contract has to be deployed. Note that the database will still contain the previously added products and the count/ids will be out of sync and the data would not persist in the Blockchain.
- Auto refresh of the products table can be implemented.


## The following tasks are completed.

- [x] Have a Web based user experience, built in React
- [x] Have a backend-for-the-frontend (BFF), written in Node.js
- [x] Have on-chain Smart Contract logic, written in Solidity
- [x] Use a Kaleido blockchain
- [x] Contain a README that gives a quick overview of the use case, and tells us how to run it