
import React, { useEffect, useState } from 'react';
import StatsCard from './StatsCard';

console.log("Not reach here");

function Dashboard({ setCurrentPage }) {

    return (
        <>
            <div className='space-y-8'>
                <StatsCard />
            </div>
        </>
    )
}

export default Dashboard;