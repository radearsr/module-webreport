const resultTables = document.querySelectorAll(".result-table");

const createTableResultRowNoContent = (text) => {
  const tr = document.createElement("tr");
  const tdText = document.createElement("td");
  tdText.setAttribute("colspan", "2");
  tdText.setAttribute("class", "px-4 py-2 border border-gray-200 text-center");
  tdText.textContent = text;
  tr.appendChild(tdText);
  return tr;
};

const createTableResultRow = (namaProduk, harga) => {
  console.log(harga);
  const tr = document.createElement("tr");
  tr.setAttribute("class", "hover:bg-gray-300  transition-all duration-200");
  const tdNamaProduk = document.createElement("td");
  tdNamaProduk.setAttribute("class", "p-1 border border-gray-200");
  tdNamaProduk.style.fontSize = "10px";
  tdNamaProduk.textContent = namaProduk;

  const tdHarga = document.createElement("td");
  tdHarga.setAttribute("class", "p-1 border border-gray-200");
  tdHarga.style.fontSize = "10px";
  tdHarga.textContent = `Rp${parseInt(harga).toLocaleString("id-ID")}`;

  tr.appendChild(tdNamaProduk);
  tr.appendChild(tdHarga);
  return tr;
};

electronAPI.resPriceLists((data) => {
  PRICE_DATAS = data;
  console.log(PRICE_DATAS);
  let loopingIdx = 1;
  const tableLenght = resultTables.length;
  resultTables.forEach((table) => {
    loopingIdx++;
    const tableId = table.getAttribute("id");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    if (!data[tableId]) {
      const tr = createTableResultRowNoContent("Mohon login ulang");
      tbody.appendChild(tr);
      if (loopingIdx === tableLenght - 1) {
        loading.setAttribute("class", "hidden");
      }
      return;
    }
    if (data[tableId].length < 1) {
      const tr = createTableResultRowNoContent("Data Tidak Ditemukan");
      tbody.appendChild(tr);
      if (loopingIdx === tableLenght - 1) {
        loading.setAttribute("class", "hidden");
      }
      return;
    }
    data[tableId].forEach((data) => {
      const tr = createTableResultRow(data.namaProduk, data.harga);
      tbody.appendChild(tr);
    });
    if (loopingIdx === tableLenght - 1) {
      loading.setAttribute("class", "hidden");
    }
  });
});
