import React, {Component} from 'react';
import {reqItem} from "../api/main";
import Modal from 'react-modal';
import {observer} from 'mobx-react'
import store from '../stores'
import CarouselComponent from "./CarouselComponent";
import MsgComponent from "./MsgComponent";
import RatingComponent from "./RatingComponent";
import PaginationComponent from "./PaginationComponent";
import { ClipLoader } from 'react-spinners';
import { socketConnect } from 'socket.io-react';



const styles = {
    productview: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 40,
        fontFamily: "'Open Sans',sans-serif",
    },
    thumb: {
        height: '100%',
        borderRadius: 0,
        position: 'relative',
        border: '1px solid rgba(192,192,192,0.2)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "flex-start"

    },
    space: {
        marginBottom: 10,
    },
    textdes: {
        textAlign: 'left',
        font: 'arial',
    },
    price: {
        fontSize: 15,
        color: "rgba(95,183,96,1)",
        position: 'absolute',
        bottom: 0,
        left: 5,
    },
    title: {
        fontSize: 17,
        color: "rgba(95,183,96,1)",

    },
    content: {
        textAlign: 'center'
    }


};


class Item extends Component {

    constructor() {
        super();

        this.state = {
            items: [],
            modalisOpen: false,
            activeItemId: null,
            currItem: [],
            show: true,
            msg: '',
        }
    }

    openModal = (id) => {
        console.log('Inside openModal()', id)
        this.setState({modalisOpen: true, activeItemId: id, currItem: store.itemStore.items.find(x => x._id === id)})
        console.log(this.state.currItem.art_name)

        console.log(this.state.activeItemId)
    }

    closeModal = () => {
        this.setState({modalisOpen: false})
    }

    componentWillMount() {
        store.itemStore.reqItem(0);
        store.socketStore.socket.emit('ack', store.userStore.name)
    }




    render() {
        const {items} = this.state;
        const {history} = this.props;


        return (
            <div className="container" style={{textAlign: "center"}}>
                <Modal className="custommodal"
                       isOpen={this.state.modalisOpen}
                       onRequestClose={this.closeModal}
                       contentLabel="GG"
                       ariaHideApp={false}
                >
                    <div style={{flex: 1, marginRight: 10}}>
                        <CarouselComponent images={this.state.currItem.img}/>
                    </div>

                    <div style={{flex: 2}}>
                        <h3 style={{textAlign: "center", color: "rgba(95,183,96,1"}}>{this.state.currItem.art_name}</h3>
                        <p>{this.state.currItem.art_desc}</p>
                        <p style={{fontSize: 10}}>Preis: <span style={{fontSize: 20, color: "rgba(95,183,96,1"}}>€ {this.state.currItem.art_price} {store.userStore.name.get()} <RatingComponent/></span> </p>
                        <MsgComponent show={this.state.show} user={this.state.currItem.art_creator}/>
                    </div>
                    <button style={{fontSize: 15,top: 0, right: -7, position: "absolute", border: "none" }} className="glyphicon glyphicon-remove-sign" onClick={this.closeModal}/>
                </Modal>

                <div className="row" style={styles.productview}>
                    {
                        store.itemStore.items.map(function (menuItem) {
                            const desc = `${menuItem.art_desc.substring(0,50)}...`
                            return (
                                <div onClick={() => {
                                    console.log('Right before openModal()', menuItem._id)
                                    this.openModal(menuItem._id)
                                }} className="col-xs-6 col-sm-6 col-md-3" style={styles.space}>
                                    <div className="thumbnail" style={styles.thumb}>
                                        <img style={{height: 200, width: "100%"}} src={menuItem.img[0]} alt=""/>
                                        <div className="caption" style={{alignItems: 'flex-start'}}>
                                            <h4 style={styles.title}>{menuItem.art_name}</h4>
                                            <p style={styles.textdes}>{desc}</p>
                                            <h5 style={styles.price}>Preis: € {menuItem.art_price}</h5>
                                        </div>
                                    </div>
                                </div>
                            );
                        }, this)
                    }
                </div>
                {store.itemStore.items.length === 0 ? <ClipLoader color="#26A65B" size={50}/> : <PaginationComponent/>}
            </div>
        );
    }
}


export default observer(Item);