import { Link } from 'react-router-dom';
import ShowClothes from './showclothes';
import { useState } from 'react';
export default function GetClothes({ props }) {
    const [type, setType] = useState('');
    return (
        <div className="container-fluid px-0">
            <div className="row">
                <div className="col-md-12 bg-white title px-0 mx-0">
                    <div className="newProduct__title">
                        <div className="newProduct__title__left">
                            <div className="header__logoText">PRODUCT</div>
                        </div>
                        <div className="newProduct__title__right desktop">
                            <div className="newProduct__item hover_underline" onClick={() => { setType("") }}>All <div className="underline"></div>
                            </div>
                            <div className="newProduct__item hover_underline" onClick={() => { setType("Shoes") }}>Shoes <div className="underline"></div>
                            </div>
                            <div className="newProduct__item hover_underline" onClick={() => { setType("Clothes") }}>Clothes <div className="underline"></div>
                            </div>
                            <div className="newProduct__item hover_underline" onClick={() => { setType("Accessories") }}>Accessories <div className="underline"></div>
                            </div>
                        </div>
                        <div className="newProduct__title__right mobile ">
                            <div className="input-group mt-3" onChange={(e) => setType(e.target.value)}>
                                <select className="custom-select" defaultValue="">
                                    <option value="">All</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around flex-wrap">
                        {props.length !== 0 ?
                            (type === "" ? props : props.filter(it => type === it.type)).map((item, index) => {
                                return (
                                    <Link to={`/admin/update-clothes/${item.id}`} className="items text-decoration-none" key={index}>
                                        {
                                            index !== 0 ? <hr className="mobile my-4" /> : ""
                                        }
                                        <ShowClothes clothes={item} />
                                    </Link>
                                )
                            })
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>

    )

}