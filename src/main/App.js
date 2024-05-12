import React from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import 'bootswatch/dist/flatly/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Rotas from "./rotas";
import '../custom.css'
import Navbar from "../components/navbar";
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min'

import ProvedorAutenticacao from "./provedorAutenticacao";
import {PrimeReactProvider} from 'primereact/api';


class App extends React.Component {

  render() {
    return (
      <ProvedorAutenticacao>
        <PrimeReactProvider>
          <div className={"container"}>
            <Rotas/>
          </div>
        </PrimeReactProvider>
      </ProvedorAutenticacao>)
  }


}

export default App;
/* o export deixa o componente visivel para oturos */