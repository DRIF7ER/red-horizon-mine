import './ErrorPage.css';
import { useParams } from 'react-router-dom';

interface ErrorPageProps {
  error?: string | number;
}

function ErrorPage({error}: ErrorPageProps) {
const { code } = useParams<{ code: string }>();

const errorCode = error || code

    return (
        <section className='error-section'>
            <h4>{`We are so sorry, there\'s been a ${errorCode} error! Please try again later.`}</h4>
        </section>
    )
}

export default ErrorPage;