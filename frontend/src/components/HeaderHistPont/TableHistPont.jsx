function TableHistPont() {
  return (
    <div className='table-responsive ms-5 me-5'>
      <table className='table'>
        <tbody>
          <tr>
            <th scope='row'>
              <i className='bi bi-arrow-up-right-circle verdeIcon'></i>
            </th>
            <td>+20</td>
            <td>2023 - 05 - 20</td>
            <td>17:58:23</td>
            <td>Castelo de Bragança</td>
          </tr>
          <tr>
            <th scope='row'>
              <i className='bi bi-arrow-down-right-circle vermelhoIcon'></i>
            </th>
            <td>-50</td>
            <td>2023 - 05 - 02</td>
            <td>14:51:47</td>
            <td>Restaurante O Abel</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableHistPont;
