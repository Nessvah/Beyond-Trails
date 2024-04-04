import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ManagersForm from "./ManagersForm";
import ManagersTable from "./ManagersTable";
import Button from "react-bootstrap/Button";
import getAllManagersData from "../../../utils/fetchData";
import { deleteManagerById } from "../../../utils/apiCalls.mjs";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../hook/useAuth";

const ListManagersComp = () => {
  const { userName } = useAuth();
  // keep track of errors state
  const [error, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // state to show or hide the form
  const [showForm, setShowForm] = useState(false);
  // state to show or hide the create manager button
  const [hideCreateBtn, setHideCreateBtn] = useState(false);

  //state to store managers data to render on the table
  const [managersData, setManagersData] = useState([]);

  let setX = false;

  /**
   * Fetch all the managers data that we have in the database to show
   * on the records table
   */
  useEffect(() => {
    async function wrapper() {
      const managersInfo = await getAllManagersData();
      console.log(managersInfo);
      setManagersData(managersInfo);
      setX = !setX;
      setIsLoading(false);
    }
    if (managersData.length === 0) wrapper();
  }, [setX]);

  const handleManagerDeletion = async (id) => {
    setIsLoading(true);

    try {
      const result = await deleteManagerById(id);

      if (result) {
        // filter out from the records table the manager deleted
        setManagersData((prevData) =>
          prevData.filter((manager) => manager._id !== id)
        );

        setIsLoading(false);
        toast.success(result.message);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(e.data.message);
    }
  };

  async function onSubmit(values) {
    setIsLoading(true);
    setHideCreateBtn(false);

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_API}/api/admin/managers`,
        values,
        { withCredentials: true }
      );

      console.log("res", response);

      if (response.data.status === "success") {
        // Update the state with the updated data
        setManagersData([...response.data.data, ...managersData]);
        setIsLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  console.log("this is state ", userName);

  return (
    <main className='container col-7'>
      <header className='row justify-content-between mt-5 py-5 px-4 flex-shrink-0 col-auto'>
        {showForm ? null : <h1>Bem-vindo {userName}</h1>}

        <h2 className='display-4 col-auto'>
          Gestão de registos de Gestores Turísticos
        </h2>
      </header>
      <section className='px-4 mt-4'>
        <div className='row justify-content-end pe-3'>
          {hideCreateBtn ? (
            <Button
              type='button'
              variant='outline-secondary'
              className='col-auto main-btn'
              onClick={() => {
                setShowForm(false);
                setHideCreateBtn(false);
              }}>
              Retroceder
            </Button>
          ) : (
            <Button
              type='button'
              variant='secondary'
              className='col-auto main-btn'
              onClick={() => {
                if (error) setErrorMsg("");
                setHideCreateBtn(true);
                setShowForm(true);
              }}>
              Registar gestor
            </Button>
          )}
        </div>
        {showForm ? (
          <ManagersForm onSubmit={onSubmit} setShowForm={setShowForm} />
        ) : (
          <ManagersTable
            x={setX}
            managersData={managersData}
            isLoading={isLoading}
            onDelete={handleManagerDeletion}
          />
        )}
      </section>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  );
};

export default ListManagersComp;
