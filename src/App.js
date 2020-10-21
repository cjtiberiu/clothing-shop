import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import { createStructuredSelector } from 'reselect';

// CSS
import './App.scss';

// COMPONENTS
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';
import AuthPage from './pages/auth/AuthPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import CollectionPage from './pages/collection-page/CollectionPage';

import CartDropdown from './components/cart-dropdown/CartDropdown';
import MobileNav from './components/mobile-nav/MobileNav';

// REDUX
import { checkUserSession, logOut } from './redux/actions/auth';
import { selectCurrentUser } from './redux/selectors/userSelector';
import { selectCollections } from './redux/selectors/shopSelector';

// FIREBASE
import { auth, createUserProfileDocument, getCollections, addCollectionAndDocuments } from './firebase/firebase.utils.js';



const App = (props) => {

    useEffect(() => {
        const {checkUserSession} = props;
        checkUserSession();
    }, []);

    return (
        <div>
        
            <header>      
                <div className='container'>
                    {props.hidden ? null : <CartDropdown  />}
                    
                    {props.navMenuOn ? <MobileNav /> : null}
                    <Header />
                </div>
            </header>
                    
                    
            <section>
                <div className='container'>
                    
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/shop' component={ShopPage} />
                        {/* <Route exact path='/shop/:category' component={CollectionPage} /> */}
                        <Route exact path='/checkout' component={CheckoutPage} />
                        <Route 
                            exact 
                            path='/auth' 
                            render={() => props.currentUser ? (
                                <Redirect to='/'/>
                            ) : (
                                <AuthPage />
                            )} />
                    </Switch>
                </div>
            </section>  
            
        </div>
    )
};

const mapStateToProps = state => {
    return {
        currentUser: selectCurrentUser(state),
        hidden: state.cart.hidden,
        navMenuOn: state.nav.navMenuOn,
        collectionsArray: Object.values(selectCollections(state))
    }

}

export default connect(mapStateToProps, { checkUserSession, logOut })(App);