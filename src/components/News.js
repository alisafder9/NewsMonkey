import React, { Component } from 'react';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general',
        theme: 'light'
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        theme: PropTypes.string
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true, // Set loading to true initially since the first request is in progress
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async componentDidMount() {
        this.updateNews(); // Trigger the first data fetch
    }

    // Fetch the initial set of news
    updateNews = async () => {
        this.props.setProgress(10);
        const { country, category, pageSize } = this.props;
        const { page } = this.state;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${pageSize}`;

        this.setState({ loading: true }); // Indicate that loading has started

        try {
            let data = await fetch(url);
            this.props.setProgress(30);
            let parsedData = await data.json();
            this.props.setProgress(60);

            if (parsedData.status === 'ok' && Array.isArray(parsedData.articles)) {
                this.setState({
                    articles: parsedData.articles,
                    totalResults: parsedData.totalResults,
                    loading: false // Done loading, so set loading to false
                });
            } else {
                console.error("Error fetching articles: ", parsedData.message);
                alert("There was an issue fetching the news. Please try again later.");
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Network error: ", error);
            alert("Network error occurred. Please check your internet connection.");
            this.setState({ loading: false });
        }
        this.props.setProgress(100);
    };

    // Fetch more data (for infinite scroll)
    fetchMoreData = async () => {
        this.props.setProgress(10);
        const nextPage = this.state.page + 1;
        const { country, category, pageSize } = this.props;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${pageSize}`;

        this.setState({ loading: true }); // Set loading to true when new data is being fetched

        try {
            let data = await fetch(url);
            this.props.setProgress(30);
            let parsedData = await data.json();
            this.props.setProgress(60);

            if (parsedData.status === 'ok' && Array.isArray(parsedData.articles)) {
                this.setState({
                    articles: this.state.articles.concat(parsedData.articles), // Append new articles
                    totalResults: parsedData.totalResults,
                    page: nextPage,
                    loading: false // Stop loading once new data is fetched
                });
            } else {
                console.error("Error fetching articles: ", parsedData.message);
                alert("There was an issue fetching the news. Please try again later.");
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Network error: ", error);
            alert("Network error occurred. Please check your internet connection.");
            this.setState({ loading: false });
        }
        this.props.setProgress(100);
    };

    render() {
        const { theme } = this.props;
        const { loading, articles, totalResults } = this.state;
        const hasMore = articles.length < totalResults; // Ensure that hasMore is true only when there are more articles to load

        return (
            <div className={`container overflow-hidden my-5 bg-${theme === 'light' ? 'light' : 'dark'} text-${theme === 'light' ? 'black' : 'white'}`}>
                <h4 className="text-center" style={{ marginTop: '2rem', marginBottom: '2rem', padding: '1rem', border: '1px solid rgba(128, 128, 128, 0.301)'}}>
                    NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
                </h4>

                {/* Main Spinner for the initial load */}
                {loading && articles.length === 0 && (
                    <div className="d-flex justify-content-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {/* Infinite Scroll Component */}
                <InfiniteScroll
                    dataLength={articles.length} // Number of items already loaded
                    next={this.fetchMoreData} // Fetch more data when scrolling
                    hasMore={hasMore} // Only continue loading if more articles are available
                    loader={hasMore && loading ? (  // Show loader only if more articles are available and data is still loading
                        <div className="d-flex justify-content-center my-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : null}
                    style={{ overflow: 'hidden' }} // Ensures smooth scrolling
                >
                    <div className="row">
                        {articles.length > 0 ? (
                            articles.map((element, index) => (
                                <div className="col-md-4" key={`${element.url}-${index}`}>
                                    <NewsItem
                                        theme={theme}
                                        title={element.title || "No title available"}
                                        description={element.description || "No description available"}
                                        imageUrl={element.urlToImage || "https://via.placeholder.com/150"}
                                        newsUrl={element.url || "#"}
                                        author={element.author || "Unknown"}
                                        date={element.publishedAt || "Unknown"}
                                        source={element.source?.name || "Unknown source"}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No news available at the moment.</p>
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;
