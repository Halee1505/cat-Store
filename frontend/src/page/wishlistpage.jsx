import Wishlist from "../components/wishlist";
import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";

export default function WishlistPage(){
    return (
        <React.Fragment>
            <Header />
            <Wishlist />
            <Footer />
        </React.Fragment>
    )
}