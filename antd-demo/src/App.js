import 'antd/dist/reset.css';
import './App.css';
//import {Button} from 'antd';
//import defaultExport  from './table.js'
//import Table from './table.js';
import {React} from 'react';
import ExcelToJsonConverter from './excel.js';

function App() {
  return (
      <div className="App">
          <ExcelToJsonConverter />
      </div>
  );
}

export default App;