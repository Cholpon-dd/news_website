import { useNavigate, useLocation } from 'react-router-dom';
import style from './newsPage.module.css';

const NewsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { item } = location.state;
  console.log(item);
  const handleGoBack = () => {
    navigate(-1);
  };
  const [publishedDate] = item.publishedAt.split('T');
  const [year, month, day] = publishedDate.split('-');
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className={style.page_wrapper}>
      <h1 className={style.main_title}>Today&#39;s News</h1>
      <p className={style.sub_title}>
        Source link:{' '}
        <a href={item.url} target="_blank" className={style.author_name}>
          {item.url}
        </a>
      </p>
      <p className={style.sub_title}>
        Author: <span className={style.author_name}>{item.author}</span>
      </p>
      <h2 className={style.title}>{item.title}</h2>
      <img src={item.urlToImage} alt="" className={style.page_img} />
      <p className={style.sub_title}>{formattedDate}</p>
      <p className={style.page_desc}>{item.description}</p>

      <button onClick={handleGoBack} className={style.back_btn}>
        Back
      </button>
    </div>
  );
};

export default NewsPage;
