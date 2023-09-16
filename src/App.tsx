import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Properties from './property-list/container/properties/properties';
import PropertyDetailComponent from './property-list/component/property-detail/property-detail.component';
import TopNav from './property-list/container/top-nav/top-nav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Properties />} />
        <Route path='/:id' element={<PropertyDetailComponent />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
