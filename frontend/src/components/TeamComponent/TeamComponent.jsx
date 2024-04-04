import imagemSu from "../../assets/images/team/avatar-su.png";
import imagemSilvia from "../../assets/images/team/silvia-avatar.png";
import imagemManuel from "../../assets/images/team/avatar-manuel.png";
import imagemAna from "../../assets/images/team/avatar-ana.png";
import "./css/teamComponent.css";

const TeamComponent = () => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8 col-lg-6'>
          <div
            className='section_heading text-center wow fadeInUp'
            data-wow-delay='0.2s'
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInUp"
            }}>
            <h1 className='m-5 p-5'>Conheça A Nossa Equipa</h1>
            <p className='m-5 p-5'>
              O nosso site foi desenvolvido por uma equipa dedicada e criativa.
              Conheça os membros da nossa equipa que tornaram tudo isto
              possível.
            </p>
            <div className='line'></div>
          </div>
        </div>
      </div>

      <div className='row'>
        {teamMembers.map((member, index) => (
          <div key={index} className='col-12 col-sm-6 col-lg-3'>
            <div
              className={`single_advisor_profile wow fadeInUp`}
              data-wow-delay={`0.${index + 2}s`}>
              <div className='advisor_thumb'>
                <img
                  src={member.image}
                  alt={member.name}
                  className='advisor_image'
                />
                <div className='social-info'>
                  <a href='#'>
                    <i className='fa fa-facebook'></i>
                  </a>
                  <a href='#'>
                    <i className='fa fa-twitter'></i>
                  </a>
                  <a href='#'>
                    <i className='fa fa-linkedin'></i>
                  </a>
                </div>
              </div>
              <div className='single_advisor_details_info'>
                <h4>{member.name}</h4>
                <p style={{ fontSize: "1.2em" }} className='designation'>
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Ana Pinho",
    role: "Developer",
    image: imagemAna
  },
  {
    name: "Manuel Esteves",
    role: "Developer",
    image: imagemManuel
  },
  {
    name: "Silvia Vanessa",
    role: "Developer",
    image: imagemSilvia
  },
  {
    name: "Soraia Dias",
    role: "Developer",
    image: imagemSu
  }
];

export default TeamComponent;
