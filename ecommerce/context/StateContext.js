import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import cart from '../pages/cart';

export const Context = createContext();

export const StateContext = ({ children }) => {
  
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [cartItems, setCartItems] = useState([])

    function increaseQty(){

        setQuantity(qty => qty + 1)
  
    }

    function decreaseQty(){
 
        setQuantity(qty => {

            if(qty - 1 < 1){

                return 1

            }
            return qty - 1
        })

    }

    function addToCart(quantity, product){

        const checkProductInCart = cartItems.find(item => item?._id === product._id)
        
        if(checkProductInCart){

            setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
            setTotalQuantity(prevTotalQuantity => prevTotalQuantity + quantity)
           
            const updateCartItems = cartItems.map(item => {
        
                if(item?._id === product._id){

                    return {

                        ...item,
                        quantity: item.quantity + quantity

                    }

                }
                else{

                    return item
    
                }
            })
            setCartItems(updateCartItems)

        }
        else{

            setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
            setTotalQuantity(prevTotalQuantity => prevTotalQuantity + quantity)

            product.quantity = quantity
            setCartItems([...cartItems, {...product}])

        }

        toast.success(quantity == 1 ? quantity + ' item added to your cart' : quantity + ' items added to your cart')

    }

    function increaseCartItemQuantity(id){

        let productFound = cartItems.find(item => item._id === id)

        const updateCartItems = cartItems.map(item => {
        
            if(item?._id === productFound._id){

                return {

                    ...item,
                    quantity: item.quantity + 1

                }

            }
            else{

                return item

            }
            
        })

        setCartItems(updateCartItems)
        setTotalQuantity(prevTotalQuantity => prevTotalQuantity + 1)
        setTotalPrice(prevTotalPrice => prevTotalPrice + productFound.price)

    }

    function decreaseCartItemQuantity(id){

        let productFound = cartItems.find(item => item._id === id)

        if(productFound.quantity > 1){

            const updateCartItems = cartItems.map(item => {
        
                if(item?._id === productFound._id){

                    return {

                        ...item,
                        quantity: item.quantity - 1

                    }

                }
                else{

                    return item

                }
            })

            setCartItems(updateCartItems)
            setTotalQuantity(prevTotalQuantity => prevTotalQuantity - 1)
            setTotalPrice(prevTotalPrice => prevTotalPrice - productFound.price)
        }
        
    }

    function remove(id){

        let productFound = cartItems.find(item => item._id === id)
        let notProductFound = cartItems.filter(item => item._id !== id)

        setTotalQuantity(prevTotalQuantity => prevTotalQuantity - productFound.quantity)
        setTotalPrice(prevTotalPrice => prevTotalPrice - productFound.price * productFound.quantity)

        setCartItems(notProductFound)

    }

    return (

        <Context.Provider value={{ totalPrice, totalQuantity, quantity, cartItems, increaseQty, decreaseQty, addToCart, increaseCartItemQuantity, decreaseCartItemQuantity, remove }}>
            {children}
        </Context.Provider>
     )

}
