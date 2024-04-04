import video from "../assets/videos/video-home.mp4";
import "../assets/css/video.css";

function Video() {
  return (
    <section className='boas-vindas'>
      <div className='container-boas-vindas'>
        <div className='video-slider'>
          <div className='video embed-responsive embed-responsive-16by9'>
            <video className='embed-responsive-item' muted autoPlay loop>
              <source src={video} type='video/mp4' />
            </video>
          </div>
          <div className='slider-container'>
            <h1 className='ps-5'>VENHA-SE AVENTURAR</h1>
            <div className='ms-5 mt-2 cta'>contact us</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Video;
