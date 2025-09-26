import './FeedbackModal.css';
import { useFeedback } from '../../context/FeedbackModalContext'; 

export default function FeedbackModal() {
  const { feedback, hideFeedback } = useFeedback();

  const { isShown, kind, mainText, secondText, image } = feedback;

  const feedbackStyle = kind === 'Sucesso' ? 'feeback-success' : 'feedback-error';
  const feebackShown = isShown ? 'feedback-visible' : 'feedback-modal';

  if (!isShown) return null;

  return (
    <div className={`${feebackShown} ${feedbackStyle}`} onClick={hideFeedback}>
      <div className='feedback-message' onClick={(e) => e.stopPropagation()}>
        <div className='feedback-texts'>
          <h2>{mainText}</h2>
          <p>{secondText}</p>
        </div>
        <img src={image} alt="" className='feedback-image'/>
        <button onClick={hideFeedback} className="close-button">X</button>
      </div>
    </div>
  );
}