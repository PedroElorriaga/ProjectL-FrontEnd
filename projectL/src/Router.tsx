import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';


export default function Router() {
    return (
        <Routes>
            <Route path='/catalogo' element={<Catalog />} />
        </Routes>
    )
}