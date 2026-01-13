import { Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './pages/Catalog';
import AddPerfume from './pages/AddPerfume';
import LoginPerfume from './pages/Login';


export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/catalogo" replace />} />
            <Route path='/catalogo' element={<Catalog />} />
            <Route path='/adicionar' element={<AddPerfume />} />
            <Route path='/login' element={<LoginPerfume />} />
        </Routes>
    )
}