import React from 'react';
import './index.css'

const Newscard = ({ data, image }) => {

    return (
        <div className='card-container'>
            <article className="news-item">
                <div>
                    <img src={image.url} className='news-image' alt={image.title} />
                </div>
                <h4> {data.title} </h4>
                <p> {data.excerpt} </p>
                <p className='card-links'>
                    <a href={data.webUrl} target='_blank' className='read' rel="noopener noreferrer" > Read more... </a>
                    <a href={`https://www.${data.provider.domain}`} target='_blank' className='provider-name' rel="noopener noreferrer" > {data.provider.name} </a>
                </p>
            </article>
        </div>
    )

}

export default Newscard;
