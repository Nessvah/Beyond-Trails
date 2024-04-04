import IconDestaque from "../IconComp/IconDestaque.jsx";
import TextoDestaque from "../TextoPComp/TextoDestaque.jsx";

function SeccaoDestaques() {
  const styles = {
    estiloPDestaques: {
      textAlign: "center",
      marginTop: "5%",
      paddingBottom: "20%"
    },
    estiloIconsDestaques: {
      fontSize: "3rem",
      display: "flex",
      justifyContent: "center",
      marginTop: "15%",
      color: "#d83713"
    }
  };

  return (
    <section className='destaques'>
      <div className='container-destaques'>
        <div className='row'>
          <div className='col-md-4'>
            <IconDestaque
              iconName='bi-shop-window  '
              estilo={styles.estiloIconsDestaques}
            />
            <TextoDestaque
              texto='Conheça os nossos parceiros!'
              estilo={styles.estiloPDestaques}
            />
          </div>
          <div className='col-md-4'>
            <IconDestaque
              iconName='bi-image-alt'
              estilo={styles.estiloIconsDestaques}
            />
            <TextoDestaque
              texto='Explore os nossos roteiros pelas alturas!'
              estilo={styles.estiloPDestaques}
            />
          </div>
          <div className='col-md-4'>
            <IconDestaque
              iconName='bi-chat-left-dots'
              estilo={styles.estiloIconsDestaques}
            />
            <TextoDestaque
              texto='Deixe as suas memórias e compartilhe a sua experiência!'
              estilo={styles.estiloPDestaques}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccaoDestaques;
