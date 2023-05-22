import { useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import style from './main.module.css';

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const myApi = import.meta.env.VITE_API_KEY_REACT;

  useEffect(() => {
    fetchNews();

    const interval = setInterval(() => {
      fetchNews();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${myApi}`;
    const options = {
      method: 'GET',
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      setNews(result.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredNews = news.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.author?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return filteredNews;
  };

  const filteredNews = handleSearch();

  const handleForceUpdate = () => {
    fetchNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.main_title}>Today&#39;s News</h1>
        <input
          type="text"
          value={searchQuery}
          className={style.input}
          placeholder="Search by title, phrases, or author"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={style.list_wrapper}>
          {isLoading
            ? Array(15)
                .fill()
                .map((_, index) => (
                  <div key={index} className={style.news_skeleton}>
                    <div className={style.skeleton_image}></div>
                    <div className={style.skeleton_loading}>
                      <div className={style.skeleton_loading}></div>
                      <div className={style.skeleton_loading}></div>
                      <div className={style.skeleton_loading}></div>
                    </div>
                  </div>
                ))
            : filteredNews?.slice(0, 15).map((item) => <NewsList key={item.title} item={item} />)}
          <div className={style.btn}>
            <button onClick={handleForceUpdate} className={style.update_btn}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
