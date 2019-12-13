import React, { Component } from 'react';
import {
    Menu,
} from 'proton-native';

export default class MenuPrincipale extends Component {
    render() {
        return(
            <Menu label="File">
            <Menu.Item type="Item" onClick={this.props.apri}>
              Apri
            </Menu.Item>
            <Menu.Item type="Item" onClick={this.props.salva}>
              Salva
            </Menu.Item>
            <Menu.Item type="Quit" />
          </Menu>
        );
    }
}
