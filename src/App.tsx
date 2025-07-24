import { PrimeReactProvider } from 'primereact/api';
import Table from './Table';
export default function MyApp() {
    return (
        <PrimeReactProvider>
           <Table/>
        </PrimeReactProvider>
    );
}