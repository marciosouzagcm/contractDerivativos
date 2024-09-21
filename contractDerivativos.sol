// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract Derivativos {

    struct Option {
        address buyer;
        address seller;
        uint256 strikePrice;
        uint256 premium;
        uint256 startDate;
        uint256 expiry;
        bool isCall;
        bool exercised;
        uint256 quantity;
        uint256 collateral;
    }

    mapping(uint256 => Option) public options;
    uint256 public optionCounter;
    AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeed) {
        require(_priceFeed != address(0), "Endereco do priceFeed invalido");
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    // Adicionando parâmetros à função createOption
    function createOption(
        uint256 _strikePrice,
        uint256 _startDate,
        uint256 _expiry,
        bool _isCall,
        uint256 _premium
    ) public payable {
        require(msg.value >= _premium, "Garantia insuficiente");
        
        options[optionCounter] = Option({
            buyer: msg.sender,
            seller: address(0),
            strikePrice: _strikePrice,
            premium: _premium,
            startDate: _startDate,
            expiry: _expiry,
            isCall: _isCall,
            exercised: false,
            quantity: 1,
            collateral: msg.value
        });
        
        optionCounter++; // Incrementa o contador de opções
    }

    function calculateOptionPremium(
        uint256 _strikePrice,
        uint256 _quantity,
        uint256 _volatility
    ) public pure returns (uint256) {
        return _strikePrice * _quantity * _volatility / 100;
    }

    function calculateExtrinsicValue(
        uint256 _marketPrice,
        uint256 _strikePrice
    ) public pure returns (uint256) {
        if (_marketPrice > _strikePrice) {
            return _marketPrice - _strikePrice;
        } else {
            return 0;
        }
    }

    function buyOption(uint256 _optionId) external payable {
    require(_optionId < optionCounter, "Option ID out of bounds");
    Option storage option = options[_optionId];
    require(!option.exercised, "Option already exercised");
}

    function exerciseOption(uint256 _optionId) external payable {
        Option storage option = options[_optionId];
        require(option.expiry >= block.timestamp, "Option expired");
        require(!option.exercised, "Option already exercised");
        option.exercised = true;
    }

    function getLatestPrice() public view returns (uint256) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function closeExpiredOption(uint256 _optionId) external {
        Option storage option = options[_optionId];
        
        require(block.timestamp > option.expiry, "A opcao ainda nao expirou");
        require(!option.exercised, "A opcao ja foi exercida");

        option.exercised = true;
        payable(option.seller).transfer(option.collateral);
    }
}
