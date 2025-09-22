import './FeedbackModal.css'

interface FeedbackModalProps {
  isModalShown: boolean,
  FeedbackKind: any,
  FeedbackMainText: String,
  FeedbackSecondText: String,
  FeedbackImage: any
}

export default function FeedbackModal(props: FeedbackModalProps) {

  const feedbackStyle = props.FeedbackKind === 'Sucesso' ? 'feeback-success' : 'feedback-error'
  const feebackShown = props.isModalShown ? 'feedback-visible' : 'feedback-modal'

  return (
    <div className={`${feebackShown} ${feedbackStyle}`}>
      <div className='feedback-message'>
        <div className='feedback-texts'>
          <h2>{props.FeedbackMainText}</h2>
          <p>{props.FeedbackSecondText}</p>
        </div>
        <img src={props.FeedbackImage} alt="" className='feedback-image'/>
      </div>
    </div>
  )
}