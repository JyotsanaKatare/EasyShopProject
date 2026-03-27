
import React, { useEffect, useState } from 'react';
import EasyShopLoader from '../EasyShopLoader';
import StatsCard from './StatsCard';
import RecentOrderTable from './RecentOrderTable';
import AnalyticsSplit from './AnalyticsSplit';
import DashboardChatIcon from './DashboardChatIcon';

function VendorDashboard({ setCurrentPage }) {

  const [loading, setLoading] = useState(true);

  // loader
  useEffect(() => {
    // Fake timer or real API call
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <EasyShopLoader />;

  return (
    <>
      <div className='space-y-8'>
        <StatsCard />
        <RecentOrderTable setCurrentPage={setCurrentPage} />
        <AnalyticsSplit setCurrentPage={setCurrentPage} />
      </div>

      <DashboardChatIcon />
    </>
  )
}

export default VendorDashboard;