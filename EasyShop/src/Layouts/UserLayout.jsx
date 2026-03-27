

import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SearchBar from "../Components/SearchBar";

const UserLayout = () => {
    return (
        <>
            <SearchBar />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default UserLayout;
