const sortings = document.querySelectorAll(".sorting");
const tables = document.querySelectorAll(".table-price");

sortings.forEach((sorting) => {
  sorting.addEventListener("click", (e) => {
    const name = e.target.textContent;
    electronAPI.reqPriceLists(name);
  });
});

console.log(tables);

const createTableRowNoContent = (text) => {
  const tr = document.createElement("tr");
  const tdText = document.createElement("td");
  tdText.setAttribute("colspan", "3");
  tdText.textContent = text;
  tr.appendChild(tdText);
  return tr;
};

const createTableRow = (kodeProduk, namaProduk, harga) => {
  const tr = document.createElement("tr");
  const tdKodeProduk = document.createElement("td");
  const tdNamaProduk = document.createElement("td");
  const tdHarga = document.createElement("td");
  tdKodeProduk.textContent = kodeProduk;
  tdNamaProduk.textContent = namaProduk;
  tdHarga.textContent = harga;
  tr.appendChild(tdKodeProduk);
  tr.appendChild(tdNamaProduk);
  tr.appendChild(tdHarga);
  return tr;
}

electronAPI.resPriceLists((data) => {
  console.log(data);
  tables.forEach((table) => {
    const tableId = table.getAttribute("id");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    if (!data[tableId]) {
      const tr = createTableRowNoContent("Mohon login ulang");
      tbody.appendChild(tr);
      return;
    };
    console.log(data[tableId]);
    data[tableId].forEach((data) => {
      console.log(data);
      const tr = createTableRow(data.kodeProduk, data.namaProduk, data.harga);
      tbody.appendChild(tr);
    });
  });
});