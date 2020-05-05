import React, { Fragment } from 'react';
import Newscard from './card';

const Cardslist = ({ news, images }) => {

    return (
        <Fragment>
            <div className='first-group'>{
                news.map((card, i) => <Newscard key={i} data={card} image={images[i]} />)
            }
            </div>
        </Fragment>
    )
}

export default Cardslist;
