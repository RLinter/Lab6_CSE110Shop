// Script.js

// The fetch function that adds data to local space
// and assign product-items to product-list
window.addEventListener('DOMContentLoaded', (event)=>{
  myStorage = window.localStorage
  let local_lists = myStorage.getItem('local_lists')
  if(local_lists === null){
    // When the data has not been fetched into the local storage
    // fetch the data and loop through the lists for storage
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data =>{
        // Fetched the data and put them in the storage
        data_in_string = JSON.stringify(data)
        myStorage.setItem('local_lists', data_in_string)
        const list_to_loop = JSON.parse(myStorage.getItem('local_lists'))
        // Loop through the list to record
        for(item of list_to_loop){
          var local_item = documennt.createElement('product-item')
          local_item.setAttribute('id', item.id)
          local_item.setAttribute('title', item.title)
          local_item.setAttribute('price', item.price)
          local_item.setAttribute('image', item.image)
          // Append the current local_item to the page
          document.getElementById('product-list').appendChild(local_item)
        }
      })
  } else {
    // When data already exists in the local storage
    // loop through the lists for storage like we did previously
    const list_to_loop = JSON.parse(local_lists)
    for(item of list_to_loop){
      var local_item = document.createElement('product-item')
      local_item.setAttribute('id', item.id)
      local_item.setAttribute('title', item.title)
      local_item.setAttribute('price', item.price)
      local_item.setAttribute('image', item.image)
      document.getElementById('product-list').appendChild(local_item)
    }

  }
})

// The function that adds item id to local storage

function add(item){
  let myStorage = window.localStorage;
  if(myStorage.getItem('items') === null) {
    // Create a array for storing ids if such local storage array doesn't exit
    var id_arr = [];
    id_arr[0] = item.getAttribute('id')
    string_id_arr = JSON.stringify(id_arr)
    myStorage.setItem('items', string_id_arr)
  } else {
    // Add the current item's id to local storage array
    var local_items = JSON.parse(myStorage.getItem('items'))
    item_id = item.getAttribute('id')
    local_items.push(item_id)
    string_id_arr = JSON.stringify(local_items)
    myStorage.setItem('items', string_id_arr)
  }
}

// The function that removes item from local storage

function remove(item) {
  // Find the index of the id and remove it from the local storage
  let myStorage = window.localStorage
  var string_id_arr = myStorage.getItem('items')
  string_id_arr = JSON.parse(string_id_arr)
  var current_id = item.getAttribute('id').toString()
  const index = string_id_arr.indexOf(current_id)
  if(index > -1){
    string_id_arr.splice(index, 1)
  }
  myStorage.setItem('items', JSON.stringify(string_id_arr))
}

function refresh(item){
  // Whenever a new product-item is created and appended to product-list
  // we refresh the shadowRoot and illustrate the properties
  item.shadowRoot.querySelector('.title').textContent = item.getAttribute('title')
  item.shadowRoot.querySelector('.price').textContent = "$ "+item.getAttribute('price')
  item.shadowRoot.querySelector('img').setAttribute('src', item.getAttribute('image'))
  item.shadowRoot.querySelector('img').setAttribute('alt', item.getAttribute('title'))

  // Search through the local storage array of ids to see if current item is already added
  // If the current item is already added increase cart-count and change the button
  if(window.localStorage.getItem('items')){
    var local_items = window.localStorage.getItem('items')
    local_items = JSON.parse(local_items)
    id_num = item.getAttribute('id')
    for(local_item of local_items){
      if(local_item == id_num){
        document.getElementById('cart-count').textContent = Number(document.getElementById('cart-count').textContent) + 1
        item.shadowRoot.querySelector('button').setAttribute('onclick', "alert('Removed from Cart')")
        item.shadowRoot.querySelector('button').textContent = 'Remove from Cart'
      }
    }
  }
}

