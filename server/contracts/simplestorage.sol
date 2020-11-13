pragma solidity >=0.4.24 <0.6.0;

contract simplestorage {
    uint256 public count = 1;
    struct Product {
        uint256 id;
        string name;
        string description;
        string manufacturer;
        string dateArrived;
    }
    event ProductCreated(
        uint256 id,
        string name,
        string description,
        string manufacturer,
        string dateArrived
    );
    Product[] public products;

    constructor() public {
        addProduct(
            "Tea",
            "A refreshing experience",
            "Clipton",
            "2020-11-13T06:58:18.846Z"
        );
        addProduct(
            "Milk",
            "Best with chocolate",
            "Moooo!!",
            "2020-11-13T06:58:18.846Z"
        );
        addProduct(
            "Coffee",
            "Eyes Wide Open",
            "La Colombe",
            "2020-11-13T06:58:18.846Z"
        );
        addProduct(
            "Cereal",
            "Yummy in Tummy",
            "Kelloggs",
            "2020-11-13T06:58:18.846Z"
        );
        addProduct(
            "Sugar",
            "Sweet treats",
            "Domino",
            "2020-11-13T06:58:18.846Z"
        );
    }

    function addProduct(
        string memory _name,
        string memory _description,
        string memory _manufacturer,
        string memory _dateArrived
    ) public {
        products.push(
            Product(count, _name, _description, _manufacturer, _dateArrived)
        );
        emit ProductCreated(
            count,
            _name,
            _description,
            _manufacturer,
            _dateArrived
        );
        count++;
    }

    function getProduct(uint256 _id)
        public
        view
        returns (
            string memory _name,
            string memory _description,
            string memory _manufacturer,
            string memory _dateArrived
        )
    {
        for (uint256 i = 0; i < products.length; i++) {
            if (_id == products[i].id) {
                return (
                    products[i].name,
                    products[i].description,
                    products[i].manufacturer,
                    products[i].dateArrived
                );
            }
        }
        return ("No data", "No data", "No data", "No data");
    }
}
