import { useParams } from 'react-router-dom';
import CardCreate from '../components/Cards/Card/create/CardCreate';
import CardView from '../components/Cards/Card/cardView/CardView';

const Card = () => {
  const { id } = useParams();
  return <>{isNaN(id) && id === 'new' ? <CardCreate /> : <CardView />}</>;
};
export default Card;
