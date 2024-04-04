import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TableServicos from "./TableServicos";
import {
  changePartnerApprovedStatus,
  getVerifiedPartners
} from "../../../utils/servicosApiCalls.js";
import "react-toastify/dist/ReactToastify.css";
import { partnerRole } from "../../../helpers/enums";
/* import { useAuth } from "../../../hook/useAuth"; */

const ListServicos = () => {
  /* const { userName } = useAuth(); */
  const [isLoading, setIsLoading] = useState(false);
  const [STData, setStData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const STInfo = await getVerifiedPartners();
        setStData(STInfo);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const updateData = (updatedPartner) => {
    setStData((prevData) =>
      prevData.map((partner) =>
        partner._id === updatedPartner._id
          ? { ...partner, ...updatedPartner }
          : partner
      )
    );
  };

  const handleApprove = async (partnerId) => {
    setIsLoading(true);

    try {
      const result = await changePartnerApprovedStatus(
        partnerId,
        partnerRole.Aprovado
      );

      if (result) {
        updateData(result.partner);
        setIsLoading(false);
        toast.success(result.message);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(e.data.message);
    }
  };

  const handleAnalyze = async (partnerId) => {
    setIsLoading(true);

    try {
      const result = await changePartnerApprovedStatus(
        partnerId,
        partnerRole.Analise
      );

      if (result) {
        updateData(result.partner);
        setIsLoading(false);
        toast.success(result.message);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(e.data.message);
    }
  };

  const handleDisapprove = async (partnerId) => {
    setIsLoading(true);

    try {
      const result = await changePartnerApprovedStatus(
        partnerId,
        partnerRole.Rejeitado
      );
      if (result) {
        updateData(result.partner);
        setIsLoading(false);
        toast.success(result.message);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(e.data.message);
    }
  };

  return (
    <main className='container'>
      <header className='row justify-content-between mt-5 py-5 px-4 flex-shrink-0 col-auto'>
        {/* {showForm ? null : <h1>Bem-vindo {userName}</h1>} */}

        <h2 className='display-4 col-auto'>
          Gestão de registos de Serviços Turísticos
        </h2>
      </header>
      <section className='px-4 mt-4 table-width'>
        <TableServicos
          STData={STData}
          /* onApprove={onApprove}
          onDisapprove={onDisapprove}
          onAnalyze={onAnalyze} */
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};

export default ListServicos;
