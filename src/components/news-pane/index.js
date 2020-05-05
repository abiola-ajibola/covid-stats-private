import React from 'react';
import './index.css';
import Cardslist from '../carousel/Cardslist';

const Newspane = ({ news, images}) => {

    return (
        <aside className="news-container main-item">
            <Cardslist news={news} images={images}/>
        </aside>
    )
}

export default Newspane;
