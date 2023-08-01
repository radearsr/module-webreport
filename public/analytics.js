const sortings = document.querySelectorAll(".sorting");
const tables = document.querySelectorAll(".table-price");
const loading = document.getElementById("analytics-loading-data");
const cancelLoading = document.getElementById("cancel-loading");

cancelLoading.addEventListener("click", () => {
  loading.setAttribute("class", "hidden");
});

sortings.forEach((sorting) => {
  sorting.addEventListener("click", (e) => {
    loading.setAttribute(
      "class",
      "container absolute top-0 bottom-0 right-0 left-0"
    );
    const name = e.target.textContent;
    electronAPI.reqPriceLists(name);
  });
});

const createTableRowNoContent = (text) => {
  const tr = document.createElement("tr");
  const tdText = document.createElement("td");
  tdText.setAttribute("colspan", "3");
  tdText.setAttribute("class", "px-4 py-2 border border-gray-200 text-center");
  tdText.textContent = text;
  tr.appendChild(tdText);
  return tr;
};

const createTableRow = (kodeProduk, namaProduk, harga) => {
  const tr = document.createElement("tr");
  tr.setAttribute("class", "hover:bg-gray-300  transition-all duration-200");
  const tdKodeProduk = document.createElement("td");
  tdKodeProduk.setAttribute("class", "px-4 py-2 border border-gray-200");
  const tdNamaProduk = document.createElement("td");
  tdNamaProduk.setAttribute("class", "px-4 py-2 border border-gray-200");
  const tdHarga = document.createElement("td");
  tdHarga.setAttribute("class", "px-4 py-2 border border-gray-200");
  tdKodeProduk.textContent = kodeProduk;
  tdNamaProduk.textContent = namaProduk;
  tdHarga.textContent = `Rp${parseInt(harga).toLocaleString("id-ID")}`;
  tr.appendChild(tdKodeProduk);
  tr.appendChild(tdNamaProduk);
  tr.appendChild(tdHarga);
  return tr;
};

electronAPI.resPriceLists((data) => {
  console.log(data);
  let loopingIdx = 1;
  const tableLenght = tables.length;
  tables.forEach((table) => {
    loopingIdx++;
    const tableId = table.getAttribute("id");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    if (!data[tableId]) {
      const tr = createTableRowNoContent("Mohon login ulang");
      tbody.appendChild(tr);
      if (loopingIdx === tableLenght - 1) {
        loading.setAttribute("class", "hidden");
      }
      return;
    }
    if (data[tableId].length < 1) {
      const tr = createTableRowNoContent("Data Tidak Ditemukan");
      tbody.appendChild(tr);
      if (loopingIdx === tableLenght - 1) {
        loading.setAttribute("class", "hidden");
      }
      return;
    }
    data[tableId].forEach((data) => {
      const tr = createTableRow(data.kodeProduk, data.namaProduk, data.harga);
      tbody.appendChild(tr);
    });
    if (loopingIdx === tableLenght - 1) {
      loading.setAttribute("class", "hidden");
    }
  });
});
