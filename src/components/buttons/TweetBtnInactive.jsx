import BTN_CLASS from '../../globalVars/btn_class'

const TweetBtnInactive = (props) => (
  <button className={BTN_CLASS.secondaryDisabled}> { props.action } </button>
)

export default TweetBtnInactive
