import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// Type for your row data
type Product = {
  code: string;
  name: string;
  category: string;
  quantity: number;
};

export default function SingleRowTable() {
  const products: Product[] = [
    {
      code: "P001",
      name: "Test Product",
      category: "Electronics",
      quantity: 10,
    },
       {
      code: "P001",
      name: "Test Product",
      category: "Electronics",
      quantity: 10,
    },
  ];

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column field="code" header="Code" />
        <Column field="name" header="Name" />
        <Column field="category" header="Category" />
        <Column field="quantity" header="Quantity" />
      </DataTable>
    </div>
  );
}
