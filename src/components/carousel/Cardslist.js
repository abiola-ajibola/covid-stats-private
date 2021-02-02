import React, { Fragment } from 'react';
import Newscard from './card';
import Loader from "../Loader";

const Cardslist = ({ news, images }) => {
    const allNews = news.map((card, i) => (
      <Newscard key={i} data={card} image={images[i]} />
    ));
    return (
        <Fragment>
            <div className='first-group'>{
                allNews.length ? allNews : <Loader />
            }
            </div>
        </Fragment>
    )
}

export default Cardslist;
