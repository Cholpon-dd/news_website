import style from './newsList.module.css';
import { Link } from 'react-router-dom';

const NewsList = ({ item }) => {
  const [publishedDate] = item.publishedAt.split('T');
  const [year, month, day] = publishedDate.split('-');
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <>
      <div className={style.list_container}>
        <div className={style.list_card}>
          <img src={item.urlToImage} alt={item.title} className={style.list_img} />
        </div>
        <div className={style.list_about}>
          <Link to={`/news/${encodeURIComponent(item.title)}`} state={{ item }}>
            <h3 className={style.title}>{item.title}</h3>
            <p className={style.desc}>{item.description}</p>
          </Link>
          <p className={style.sub_title}>
            Author: <span className={style.author_name}>{item.author}</span>
          </p>
          <p className={style.sub_title}>
            Source link:{' '}
            <a href={item.url} target="_blank" className={style.author_name}>
              {item.url}
            </a>
          </p>
          <p className={style.sub_title}>{formattedDate}</p>
        </div>
      </div>
    </>
  );
};

export default NewsList;
