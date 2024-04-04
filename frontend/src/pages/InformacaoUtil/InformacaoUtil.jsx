import HeaderInfoUtil from "../../components/InformacaoUtil/HeaderInfoUtil";
import InformacoesFundo from "../../components/InformacaoUtil/InformacoesFundo";
import InfosPontoTuristico from "../../components/InformacaoUtil/InfosPontoTuristico";

function InformacaoUtil() {
  return (
    <div className='InformacaoUtil'>
      <HeaderInfoUtil />
      <InfosPontoTuristico />
      <InformacoesFundo />
    </div>
  );
}

export default InformacaoUtil;
