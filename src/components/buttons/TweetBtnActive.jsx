import BTN_CLASS from '../../globalVars/btn_class'

const TweetBtnActive = (props) => (
  <label className={BTN_CLASS.secondary}> { props.action } </label>
)

export default TweetBtnActive
