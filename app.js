document.addEventListener('DOMContentLoaded', () => {

    const stocksData = JSON.parse(stockContent); // Ensure this is defined correctly
    const userData = JSON.parse(userContent); // Ensure this is defined correctly
  
    console.log({ userData });
    console.log({ stocksData });
  
    generateUserList(userData, stocksData);
  
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');
  
    // Register the event listener on the delete button
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
      } else {
        console.error('User not found');
      }
    });
  
    // Register the event listener on the save button
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex !== -1) {
        userData[userIndex].user.firstname = document.querySelector('#firstname').value;
        userData[userIndex].user.lastname = document.querySelector('#lastname').value;
        userData[userIndex].user.address = document.querySelector('#address').value;
        userData[userIndex].user.city = document.querySelector('#city').value;
        userData[userIndex].user.email = document.querySelector('#email').value;
  
        generateUserList(userData, stocksData);
      } else {
        console.error('User not found');
      }
    });
  
  });
  
  /**
   * Loops through the users and renders a ul with li elements for each user
   * @param {*} users
   * @param {*} stocks
   */
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';
  
    users.map(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = user.lastname + ', ' + user.firstname;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    // Register event listener only once
    userList.removeEventListener('click', handleUserListClick); // Prevent duplicate listeners
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }
  
  /**
   * Handles the click event on the user list
   * @param {*} event
   */
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
  
    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    } else {
      console.error('User not found');
    }
  }
  
  /**
   * Populates the form with the user's data
   * @param {*} data
   */
  function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  /**
   * Renders the portfolio items for the user
   * @param {*} user
   * @param {*} stocks
   */
  function renderPortfolio(user, stocks) {
    const portfolio = user.portfolio || [];
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = '';
  
    portfolio.map(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    // Register event listener only once
    portfolioDetails.removeEventListener('click', handlePortfolioClick); // Prevent duplicate listeners
    portfolioDetails.addEventListener('click', (event) => handlePortfolioClick(event, stocks));
  }
  
  /**
   * Handles clicks on portfolio items
   * @param {*} event
   * @param {*} stocks
   */
  function handlePortfolioClick(event, stocks) {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  }
  
  /**
   * Renders the stock information for the symbol
   * @param {*} symbol
   * @param {*} stocks
   */
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
      const stock = stocks.find(stock => stock.symbol == symbol);
  
      if (stock) {
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = `logos/${symbol}.svg`;
      } else {
        console.error('Stock not found');
      }
    }
  }