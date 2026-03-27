
import React from 'react'
import StockInventoryCards from '../Components/VendorComponents/StockInventoryCards';
import StockInventoryTable from '../Components/VendorComponents/StockInventoryTable';

function VendorStockInventoryPage({setCurrentPage}) {
    return (
        <>
            <StockInventoryCards setCurrentPage={setCurrentPage} />
            <StockInventoryTable />
        </>
    )
}

export default VendorStockInventoryPage;