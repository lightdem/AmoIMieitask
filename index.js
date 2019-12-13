import React, { Component } from 'react';
import fs from 'fs';
import MenuPrincipale from './Components/MenuPrincipale.js';
import {
  render,
  Window,
  App,
  TextInput,
  Dialog,
  Menu,
  Box,
  RadioButtons,
  Grid,
} from 'proton-native';

class AmoIMieiTask extends Component {
  constructor(props) {
    super(props);
    this.state ={
      testo: '',
      progetto: '',
    };
    this.salva = this.salva.bind(this);
    this.apri = this.apri.bind(this);
  }

  salva() {
    const filename = Dialog('Save');
    if (filename) {
        let dati = (JSON.stringify(this.state));
        console.log(dati);
        fs.writeFileSync(filename, dati );
    }
  }

  apri() {
    const filename = Dialog('Open');
    if (filename) {
        let dati = fs.readFileSync(filename);
        // I dati sono una stringa contenente JSON;
        this.setState(JSON.parse(dati));
        // Aggiorniamo l'interfaccia
        this.forceUpdate();
        console.log(this.state);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (typeof nextState.testo === 'string') return false;
    // nextState impostato da input
    else return true; // nextState impostato da file
}

  render() {
    return (
      <App> // bisogna sempre includere il tag APP
        <MenuPrincipale 
        apri = {this.apri}
        salva = {this.salva} 
        />
    
        <Window
          onClose={() => console.log('Chiudendo')}
          title="Note"
          size={{ w: 500, h: 500 }}
        >
          <Grid>
            <TextInput
            row={0} column={0} 
            align={{h:false, v: true}}
              onChange={testo => this.setState({ testo })}
              multiline={true}
            >
              {this.state.testo}
            </TextInput>
              <RadioButtons color="blue" selected={
                                        (parseInt(this.state.progetto, 10) + 1)}
                onSelect={progetto => this.setState( {progetto} )}
                row ={0} column = {1}
                expand={{h:false, v:false}}>
                    <RadioButtons.Item>Progetto 1</RadioButtons.Item>
                    <RadioButtons.Item>Progetto 2</RadioButtons.Item>
                    {console.log(this.state)};
                </RadioButtons>
          </Grid>
        </Window>
      </App>
    );
  }
}

render(<AmoIMieiTask />);
