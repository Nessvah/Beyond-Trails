import Header from "../../../HeaderComp/Header";
import "../css/FeedStyle.css";
import feedbackImage from "../../../../assets/images/home-parceiros/feedback-hr.png";

function HeaderFeed() {
  return (
    <div className='container fundo'>
      <Header heading='Feedback' imgUrl={feedbackImage} />
    </div>
  );
}

export default HeaderFeed;
