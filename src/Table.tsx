import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { InputSwitchChangeEvent } from 'primereact/inputswitch';
import { InputSwitch } from 'primereact/inputswitch';
import { dataFetch } from './Api.ts';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primeicons/primeicons.css';
// The input switch UI is not working properly ...In my guess there is issue from PrimeReact Prime react...I can create a custom switch UI but since in the task it is told to use PrimeReact components that's why I am using the InputSwitch component from PrimeReact.∏
type T = {
    id: number, // Make sure you have an id field for proper selection
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

    const onRowSelect = (event: { data: T }) => {
        if (rowClick) {
            setSelectedProducts(prev => {
                const selected = prev || [];
                const isSelected = selected.some(item => item.id === event.data.id);
                
                if (isSelected) {
                    return selected.filter(item => item.id !== event.data.id);
                } else {
                    return [...selected, event.data];
                }
            });
        }
    };

    return (
        <div className="card p-4">
            <div className='absolute z-999 top-[10vh] left-[3vw]'>
                <Button className="p-button-sm" type="button" icon="pi pi-chevron-down" onClick={(e) => op.current?.toggle(e)} />
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
                onPage={(e) => setPage(e.page)}
                rowsPerPageOptions={[1, 2, 3, 4]}
                value={products}
                selectionMode={rowClick ? 'multiple' : 'checkbox'}
                selection={selectedProducts || []}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
                onRowClick={rowClick ? onRowSelect : undefined}
            >
                {!rowClick && (
                    <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                )}
                <Column className='p-3' field="title" header="Title" />
                <Column className='p-3' field="place_of_origin" header="Place of Origin" />
                <Column className='p-3' field="artist_display" header="Artist Display" />
                <Column className='p-3' field="inscriptions" header="Inscriptions" />
                <Column className='p-3' field="date_start" header="Date Start" />
                <Column className='p-3' field="date_end" header="Date End" />
            </DataTable>
        </div>
    );
}