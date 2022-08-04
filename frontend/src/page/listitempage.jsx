import Header from "../components/header"
import Footer from "../components/footer"
import ListItem from "../components/listitem"

import React from "react"
export default function ListItemPage(){
    return(
        <React.Fragment>
            <Header />
            <ListItem />
            <Footer/>
        </React.Fragment>
    )
}