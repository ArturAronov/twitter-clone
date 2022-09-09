import BTN_CLASS from '../../globalVars/btn_class'

const TweetBtnActive = (props) => (
  <label className={BTN_CLASS.secondary} htmlFor="TweetModal"> { props.action } </label>
)

export default TweetBtnActive
