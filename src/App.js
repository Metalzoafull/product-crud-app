import React, { Component } from "react";
import Products from "./component/Products";
import { Panel } from 'primereact/panel';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Panel header="Tienda CRUD App">

          <Products />

        </Panel>

      </div>
    );
  };
}
