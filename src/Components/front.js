import React from 'react';
import axios from 'axios';
import Item from './Item';
import NavbarComponent from "./Navbar";


const styles = {
    bg: {
        backgroundColor: 'white',
    }
}


class Front extends React.Component {
    render () {
        console.log(this.props)
        return(
            <div>
                <div style={styles.bg}>
                    <NavbarComponent/>
                    <Item history={this.props.history} />
                </div>
            </div>
        );
    }
}

export default Front;
