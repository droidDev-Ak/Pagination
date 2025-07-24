import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { InputSwitchChangeEvent } from 'primereact/inputswitch';
import { InputSwitch } from 'primereact/inputswitch';
import { dataFetch } from './Api.ts';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import './index.css';


// The input switch UI is not working properly ...In my guess there is issue from PrimeReact Prime react...I can create a custom switch UI but since in the task it is told to use PrimeReact components that's why I am using the InputSwitch component from PrimeReact.∏
type T = {
    id:number,
    title: string,
    place_of_origin: string,
    artist_display: string,
    inscriptions: null,
    date_start: number,
    date_end: number,
};


export default function CheckboxRowSelectionDemo() {
    const [products, setProducts] = useState<T[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<T[] | null>(null);
    const [rowClick, setRowClick] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [rowSelect, setRowSelect] = useState<number>(0);
    const op = useRef<OverlayPanel>(null);


    useEffect(() => {
        dataFetch(page + 1).then(({ data, total }) => {
            setProducts(data);
            setTotalRecords(total);

        });
    }, [page]);

    const handleSubmit = () => {
        if (rowSelect > 0) {
            const totalPages = Math.ceil(rowSelect / 12);
            let allSelected: T[] = [];
            // console.log(totalPages);
            
            const fetchPages = async () => {

                for (let i = 1; i <= totalPages; i++) {
                    const { data: pageData } = await dataFetch(i);
                    const startIndex = 0;
                    const endIndex = Math.min(12, rowSelect - allSelected.length);
                    allSelected = [...allSelected, ...pageData.slice(startIndex, endIndex)];

                    if (allSelected.length >= rowSelect) break;
                }

                setSelectedProducts(allSelected);
                console.log("Selected Products from Submit:", allSelected);
            };

            fetchPages();
        }
    };

    

    return (
        <div className="card p-4">


            <div className=" flex justify-center items-center mb-4 gap-2">
                <InputSwitch
                    inputId="input-rowclick"
                    checked={rowClick}
                    onChange={(e: InputSwitchChangeEvent) => setRowClick(e.value!)}
                />
                <label htmlFor="input-rowclick" className="cursor-pointer">
                    Row Click
                </label>
            </div>


            <DataTable
                className='rounded-md border-1 border-black shadow-xl shadow-black p-1'
                paginator

                rows={12}
                lazy
                totalRecords={totalRecords}
                first={page * 12}
                onPage={(e:any) => setPage(e.page)}


                value={products}
                selectionMode={rowClick ? 'multiple' : 'checkbox'}
                selection={selectedProducts || []}
                onSelectionChange={(e: any) => setSelectedProducts(e.value)}
                dataKey="id" // I am assuming that APi titles are unique
                tableStyle={{ maxWidth: '95rem' }}

                
            >
                {!rowClick && (
                    <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}
                     header={

                        <div className='absolute top-5 border-0 outline-0 left-7 size-2 md:left-9'>
                        
                            <Button className="p-button-sm focus:outline-none focus:ring-0  size-7" type="button" icon="pi pi-chevron-down" onClick={(e) => op.current?.toggle(e)} />
                            <OverlayPanel ref={op}>
                                <div className='flex flex-col p-4'>

                                    <input
                                        type="number"
                                        placeholder='Enter Rows to select'
                                        className='p-2 border-1 border-gray-300 rounded-md mb-2'
                                        value={rowSelect}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setRowSelect(Number(e.target.value));
                                        }}
                                    />

                                    <button
                                        className='p-2 bg-indigo-400 w-fit mx-auto outline-0 border-0 p-button rounded-md'
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </OverlayPanel>
                        </div>
                    } 

                    ></Column>
                )}
                <Column className='p-3' field="title" header='Title'>
                    // How to add a title heading as well as a button to select the no of rows to be selected in the datable



                   

                </Column>
                <Column className='p-3' field="place_of_origin" header="Place of Origin" />
                <Column className='p-3' field="artist_display" header="Artist Display" />
                <Column className='p-3' field="inscriptions" header="Inscriptions" />
                <Column className='p-3' field="date_start" header="Date Start" />
                <Column className='p-3' field="date_end" header="Date End" />
            </DataTable>
        </div>
    );
}