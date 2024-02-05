import patito from '../../assets/images/patito.png';
import ReduxExamplesPage from '../ReduxExamplesPage/ReduxExamplesPage.jsx';

export default function HomePage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>TITULO 1</h1>
          <img src={patito} alt="patito" width={'400px'} />
          <ReduxExamplesPage />
        </div>
      </div>
    </div>
  );
}
