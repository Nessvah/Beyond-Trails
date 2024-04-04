function TextoDestaque({ texto, estilo }) {
  return (
    <p className='p-destaques' style={estilo}>
      {texto}
    </p>
  );
}

export default TextoDestaque;
