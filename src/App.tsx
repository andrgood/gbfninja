import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Search from './pages/Search'

function App(): React.ReactElement {

    return (
        <Router>
            <NavBar />
            
            <Switch>
                <Route path="/">
                    <Search />
                </Route>
            </Switch>
        </Router>
    )
}

export default App