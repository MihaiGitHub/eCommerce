export const addItem = (item, next) => {

    let cart = [];
    if(window !== 'undefined'){
        if(localStorage.getItem('cart')){
            // convert json string to json object
           cart = JSON.parse(localStorage.getItem('cart'));
        }
        
        // add 1 item to cart each time
        cart.push({
            ...item,
            count: 1
        });

        // create a unique array so same product doesn't get added twice
        //  Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.
        // console.log(Array.from('foo')); // expected output: Array ["f", "o", "o"]
        // Sets are a new object type included in ES6 that allow the creation of collections of unique values
        cart = Array.from(new Set(cart.map((p) => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        // callback function passed in when this function is called
        next();
    }
}

export const itemTotal = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}