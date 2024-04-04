import { useAuth } from "../../hook/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import imagem1 from "../../assets/images/beneficioPartner/imagem-perfil.png";
import EditProfileForm from "./EditProfile";
import { Container, Row, Col } from "react-bootstrap";
import imgPassword from "../../assets/images/beneficioPartner/password.png";
import ModalUpdatePerfil from "./CustomModal";
import "./css/perfilVisitante.css";
function PerfilVisitante() {
  const user = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [editMode, setEditMode] = useState(false); // estado para controlar o modo de edição

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_API}/api/users/editar-perfil/${user.userId}`,
          { withCredentials: true }
        );

        if (response.data.status === "success") {
          const userData = response.data.data;
          setCurrentUser(userData);
        } else {
          console.error("Erro ao buscar informações do usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };
    fetchUser();
  }, [user]);

  // alterna entre o modo de edição e o modo de visualização
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  // function to handle profile update
  const onUpdate = async (updatedData) => {
    try {
      // logic to update the user's profile
      setCurrentUser(updatedData); // update the state with the new user data
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className='retangulo bg-primary-subtle'>
      <Container>
        <Row>
          <Col
            lg={6}
            className='container-card d-flex align-items-center justify-content-center'>
            <div className='cardTodo p-5 '>
              <div className='carta itens-align-center '>
                <div className='cardImgContainer'>
                  <img
                    src={imagem1}
                    alt='imagem ilustrativa'
                    className='cardImg'
                  />
                </div>
                <div className=' cardBody'>
                  {editMode ? (
                    // se => modo de edição => ver form
                    // <EditProfileForm profileData={currentUser} />
                    <EditProfileForm
                      currentUser={currentUser}
                      onUpdate={onUpdate}
                    />
                  ) : (
                    // caso contrário => informações de perfil
                    <>
                      <h4 className='mb-5'>
                        {currentUser ? currentUser.name : "Carregando..."}
                      </h4>
                      <div className='mb-5'>
                        <p>
                          {currentUser ? currentUser.email : "Carregando..."}
                        </p>
                      </div>
                      <div className='mb-5'>
                        <p>
                          {currentUser ? currentUser.city : "Carregando..."}
                        </p>
                      </div>

                      <div className='mb-5'>
                        <p>
                          {currentUser
                            ? currentUser.dateOfBirth
                            : "Carregando..."}
                        </p>
                      </div>
                    </>
                  )}

                  {/*alterna entre modo de edição e modo de visualização  */}
                  {/*editMode V? => bg-primary se nao => bg-secondary  */}
                  <button
                    className={`editarButton btn fs-4 text-white ${
                      editMode ? "bg-primary" : "bg-secondary"
                    }`}
                    onClick={toggleEditMode}>
                    {editMode ? "Cancelar Edição" : "Editar Perfil"}
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <section className='tabela-password mt-5 pt-5'>
              <div className='container-todo itens-align-center'>
                <h4 className='text-primary text-center'>
                  Utilize uma palavra-passe mais segura ou altere-a se alguém
                  tiver conhecimento da mesma.
                </h4>
                <div>
                  <p className='text-secondary ps-4' onClick={handleShowModal}>
                    Alterar palavra-passe
                  </p>

                  {showModal && (
                    <ModalUpdatePerfil
                      show={showModal}
                      onHide={handleHideModal}
                      title={<h4>Alterar palavra-passe</h4>}
                    />
                  )}
                </div>
              </div>
              <div className='container-imagem d-flex justify-content-end w-50'>
                <img className='dots' src={imgPassword} alt='imagem password' />
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PerfilVisitante;
