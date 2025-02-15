import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, theme, author, date, source } = this.props;
        return (
            <>
            <div className='my-3'>
                <div className={`card bg-${theme === 'light' ? 'white' : 'black'} position-relative`}>
                <span className="badge text-bg-success position-absolute top-0 end-0">{source}</span>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h4 className={`card-title text-${theme === 'light' ? 'black' : 'white'} text-start`}>{title}</h4>
                            <p className={`card-text text-${theme === 'light' ? 'black' : 'white'} text-start`}>{description}</p>
                            <p className="card-text"><small className={`text-${theme === 'light' ? 'black' : 'white'} text-opacity-50`}><em>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</em></small></p>
                            <a rel="noreferrer" href={newsUrl} target='_blank' className={`btn btn-sm btn-${theme === 'light' ? 'dark' : 'primary'}`}>Read more</a>
                        </div>
                </div>
            </div>
            </>
        )
    }
}

export default NewsItem;
