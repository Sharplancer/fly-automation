import React from 'react';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';
import LayoutComponent from './components/Layout';
import AutomationPage from './pages/Automation';
import ScrapingPage from './pages/Scraping';
import { PATH } from './utils';

function App() {

  return (
    <LayoutComponent>
      <Routes>
        <Route path={PATH.AUTOMATION} element={<AutomationPage/>}>
        </Route>
        <Route path={PATH.SCRAPING} element={<ScrapingPage/>}>
        </Route>
        <Route path="*" element={<Navigate to="/automation" replace />}/>
        </Routes>
    </LayoutComponent>
  );
}

export default App;
