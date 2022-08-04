import Header from "../components/header"
import Footer from "../components/footer"
import ItemDetail from "../components/itemdetail"
import React from "react"

export default function ItemDetailPage(){
    return(
        <React.Fragment>
            <Header />
            <ItemDetail />
            <Footer />
        </React.Fragment>
    )
}