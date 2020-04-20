// import modules
import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import path from 'path';

// import api, main helper functions, etc.
// import * as mainAPI from './mainAPI';

// import components
import Component1 from './components/Component1';
/*
import Home from './components/Home';
// import BookDetails from './components/BookDetails'; // lazy loaded
import Loading from './components/Loading';

// lazy loading
let loadableBookDetails = Loadable({
    loader: () => import('./components/BookDetails'),
    loading: Loading,
})

*/

class ComponentUser extends React.Component {
    render() {
        return (
            <Component1 />
        );
    }
}

export default ComponentUser;
