var $$ = Dom7,
    app = new Framework7({
        root: "#app",
        name: "Web Monitoring BSI",
        theme: "auto",
        id: "com.webmonbsi.prod",
        panel: {
            swipe: !0
        },
        routes: [{
            path: "/",
            url: "./index.html",
            async: function(a, n, e, t) {
                _myToken ? console.log("didysukarman...abcd") : console.log("didysukarman")
            }
        }, {
            path: "/contactus/",
            url: "./pages/contactus.html"
        }, {
            path: "/form/",
            url: "./pages/form.html"
        }, {
            path: "/dashboard_asli/",
            url: "./pages/dashboard2.html"
        }, {
            name: "dashboard",
            path: "/dashboard/",
            async: function(a, n, e, t) {
                var i = {
                    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    Authorization: _myToken,
                    "X-DS-Application-Id": applicationId,
                    "X-DS-REST-API-Key": restApiKey,
                    "X-DS-GUID": dsguid
                };
                app.preloader.show(), this.app.request({
                    url: dsurl,
                    headers: i,
                    method: "GET",
                    timeout: 1e4,
                    processData: !0,
                    dataType: "application/json",
                    success: function(a) {
                        app.preloader.hide();
                        var n = JSON.parse(a);
                        _myToken = n.token, "200" == n.responCode && (_myToken = n.token), e({
                            componentUrl: "./pages/dashboard.html"
                        }, {
                            context: {
                                title: _myName,
                                balance: formatRupiah(_myBal, "Rp. "),
                                kodeMember: _myAcc,
                                myDSContent: _myPageContent
                            }
                        })
                    },
                    error: function(a) {
                        app.preloader.hide(), app.dialog.alert("Unauthorized, Token Anda tidak valid. Mohon login ulang"), t(), app.popup.close(), app.view.main.router.back("/", !0)
                    }
                })
            },
            on: {
                pageInit: function(a, n) {},
                pageAfterOut: function(a, n) {
                    setTanggal()
                }
            }
        }, {
            path: "(.*)",
            url: "./pages/404.html"
        }]
    }),
    mainView = app.views.create(".view-main", {
        url: "/",
        dynamicNavbar: !0
    }),
    applicationId = "dbb28fda-31c6-4579-0671-de10146c4b83",
    restApiKey = "b6478c6f-3074-43c9-03d4-d52b6ef9005f",
    dsurl = "http://122.248.38.30:1028/services",
    dsguid = "";

function keluar() {
    for (var a = 0; a < mainView.history.length; a++) "index.html" === mainView.history[a] && mainView.history.splice(a, 1), $$(".view-main .page-on-left, .view-main .navbar-on-left").remove();
    app.popup.close(), app.view.main.router.back("/", !0);
    var n = {
            "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            Authorization: _myToken,
            "X-DS-Application-Id": applicationId,
            "X-DS-REST-API-Key": restApiKey,
            "X-DS-GUID": dsguid
        },
        e = '{"service":"logout","data":{"param1":"' + _myAcc + '","param2":"' + dsguid + '"}}';
    app.request({
        method: "POST",
        headers: n,
        data: e,
        contentType: "application/json",
        processData: !1,
        url: dsurl
    })
}

function confirmLogout() {
    app.popover.close(), app.dialog.confirm("Apakah anda yakin akan keluar ?", function() {
        keluar()
    })
}

function settingProfile() {
    app.popover.close(), app.dialog.alert("Under Construction!")
}

function settingUbahPassword() {
    app.popover.close(), app.dialog.alert("Under Construction!")
}

function cekBalance() {
    var a = {
        "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        Authorization: _myToken,
        "X-DS-Application-Id": applicationId,
        "X-DS-REST-API-Key": restApiKey,
        "X-DS-GUID": dsguid
    };
    app.preloader.show();
    var n = '{"service":"getBalance","data":{"param1":"' + _myAcc + '","param2":"2","param3":"' + _myAcc + '"}}',
        e = "";
    app.request({
        method: "POST",
        headers: a,
        data: n,
        contentType: "application/json",
        processData: !1,
        url: dsurl,
        success: function(a) {
            app.preloader.hide();
            var n = JSON.parse(a);
            if (_myToken = n.token, "000" == n.responCode) {
                var t = n.data[0];
                t = JSON.stringify(t);
                var i = JSON.parse(t);
                e = i.saldo, _myBal = e, $$("#saldo_baru").val("Saldo : " + formatRupiah(e, "Rp. ")), $$("#saldo_baru1").val("Saldo : " + formatRupiah(e, "Rp. ")), $$("#sisa_saldo").val("Saldo: " + formatRupiah(e, "Rp. ")), app.dialog.alert("Sisa saldo Anda saat ini adalah : " + formatRupiah(e, "Rp. "))
            }
        },
        error: function(a) {
            app.preloader.hide(), app.popup.close(), app.view.main.router.back("/", !0), app.dialog.alert("Unauthorized, Mohon Login Ulang")
        }
    })
}

function loadDS(a) {
    "1" == a ? _myPageContent = '<div class="block-title"><b>Lacak Transaksi</b></div>\n                            <form class="list" id="form-lacaktransaksi">\n                                <ul>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Tanggal Transaksi</div>\n                                        <div class="item-input-wrap">\n                                        <input type="date" value="dd-mm-yyyy" name="tanggal" placeholder="dd-mm-yyyy">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Kriteria</div>\n                                        <div class="item-input-wrap">\n                                        <div class="item-input-wrap input-dropdown-wrap">\n                                        <select name="kriteria">\n                                            <option value="1">No Pelanggan</option>\n                                            <option value="2">Payment Code</option>\n                                        </select>\n                                        </div>\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Keyword</div>\n                                        <div class="item-input-wrap">\n                                        <input type="text" name="keyword" placeholder="Keyword">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-inner">\n                                        <div class="item-input-wrap">\n                                        <input type="text" id="respon" name="respon" class="text-color-deeporange align-content-center" disabled>\n                                        </div>\n                                    </div>\n                                </li>\n                                </ul>\n                            </form>\n                            <div class="block block-strong row">\n                                <div class="col"><a class="button button-fill color-green convert-form-to-data" href="#" onClick="loadData(\'lacaktransaksi\')">Proses</a></div>\n                            </div>\n                            <div class="card data-table">\n                                <p></p>\n                                <div class="block">\n                                    <div class="row">\n                                        <button class="col button button-outline" id="btnExport" onclick="exportReportToExcel(\'oman\', \'Lacak Transaksi.xlsx\')">Export To Excel</button>\n                                    </div>\n                                </div>\n                                \n                                <p id="mydstable"></p>\n                                \n                                <div class="data-table-footer">\n                                    <div class="data-table-rows-select">\n                                        Per page:\n                                        <div class="input input-dropdown">\n                                            <select>\n                                            <option value="5">5</option>\n                                            <option value="10">10</option>\n                                            <option value="25">25</option>\n                                            <option value="all">All</option>\n                                            </select>\n                                        </div>\n                                        </div>\n                                        <div class="data-table-pagination">\n                                        <span class="data-table-pagination-label">1-5 of 10</span>\n                                        <a href="#" class="link disabled">\n                                            <i class="icon icon-prev color-gray"></i>\n                                        </a>\n                                        <a href="#" class="link">\n                                            <i class="icon icon-next color-gray"></i>\n                                        </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>' : "2" == a ? _myPageContent = '<div class="block-title"><b>Laporan Rekapitulasi Transaksi</b></div>\n                            <form class="list" id="form-laprekaptrans">\n                                <ul>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Tanggal Transaksi</div>\n                                        <div class="item-input-wrap">\n                                        <input type="date" value="" name="tanggal" placeholder="dd-mm-yyyy">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-inner">\n                                        <div class="item-input-wrap">\n                                        <input type="text" id="respon" name="respon" class="text-color-deeporange align-content-center" disabled>\n                                        </div>\n                                    </div>\n                                </li>\n                                </ul>\n                            </form>\n                            <div class="block block-strong row">\n                                <div class="col"><a class="button button-fill color-green convert-form-to-data" href="#" onClick="loadData(\'laprekaptrans\')">Proses</a></div>\n                            </div>\n                            <div class="card data-table">\n                                <p></p>\n                                <div class="block">\n                                    <div class="row">\n                                        <button class="col button button-outline" id="btnExport" onclick="exportReportToExcel(\'oman\', \'Laproan Rekapitulasi Transaksi.xlsx\')">Export To Excel</button>\n                                    </div>\n                                </div>\n                                \n                                <p id="mydstable"></p>\n                                \n                                <div class="data-table-footer">\n                                    <div class="data-table-rows-select">\n                                        Per page:\n                                        <div class="input input-dropdown">\n                                            <select>\n                                            <option value="5">5</option>\n                                            <option value="10">10</option>\n                                            <option value="25">25</option>\n                                            <option value="all">All</option>\n                                            </select>\n                                        </div>\n                                        </div>\n                                        <div class="data-table-pagination">\n                                        <span class="data-table-pagination-label">1-5 of 10</span>\n                                        <a href="#" class="link disabled">\n                                            <i class="icon icon-prev color-gray"></i>\n                                        </a>\n                                        <a href="#" class="link">\n                                            <i class="icon icon-next color-gray"></i>\n                                        </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>' : "3" == a ? _myPageContent = '<div class="block-title"><b>Laporan Mutasi</b></div>\n                            <form class="list" id="form-lapmutasi">\n                                <ul>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Tanggal Transaksi</div>\n                                        <div class="item-input-wrap">\n                                        <input type="date" value="" name="tanggal" placeholder="dd-mm-yyyy">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-inner">\n                                        <div class="item-input-wrap">\n                                        <input type="text" id="respon" name="respon" class="text-color-deeporange align-content-center" disabled>\n                                        </div>\n                                    </div>\n                                </li>\n                                </ul>\n                            </form>\n                            <div class="block block-strong row">\n                                <div class="col"><a class="button button-fill color-green convert-form-to-data" href="#" onClick="loadData(\'lapmutasi\')">Proses</a></div>\n                            </div>\n                            <div class="card data-table">\n                                <p></p>\n                                <div class="block">\n                                    <div class="row">\n                                        <button class="col button button-outline" id="btnExport" onclick="exportReportToExcel(\'oman\', \'Laporan Mutasi (Rekening Koran).xlsx\')">Export To Excel</button>\n                                    </div>\n                                </div>\n\n                                <p id="mydstable"></p>\n                                \n                                <div class="data-table-footer">\n                                    <div class="data-table-rows-select">\n                                        Per page:\n                                        <div class="input input-dropdown">\n                                            <select>\n                                            <option value="5">5</option>\n                                            <option value="10">10</option>\n                                            <option value="25">25</option>\n                                            <option value="all">All</option>\n                                            </select>\n                                        </div>\n                                        </div>\n                                        <div class="data-table-pagination">\n                                        <span class="data-table-pagination-label">1-5 of 10</span>\n                                        <a href="#" class="link disabled">\n                                            <i class="icon icon-prev color-gray"></i>\n                                        </a>\n                                        <a href="#" class="link">\n                                            <i class="icon icon-next color-gray"></i>\n                                        </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>' : "4" == a ? _myPageContent = '<div class="block-title"><b>Laporan Transaksi Reversal</b></div>\n                            <form class="list" id="form-laptransrev">\n                                <ul>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Tanggal Transaksi</div>\n                                        <div class="item-input-wrap">\n                                        <input type="date" value="" name="tanggal" placeholder="dd-mm-yyyy">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-inner">\n                                        <div class="item-input-wrap">\n                                        <input type="text" id="respon" name="respon" class="text-color-deeporange align-content-center" disabled>\n                                        </div>\n                                    </div>\n                                </li>\n                                </ul>\n                            </form>\n                            <div class="block block-strong row">\n                                <div class="col"><a class="button button-fill color-green convert-form-to-data" href="#" onClick="loadData(\'laptransrev\')">Proses</a></div>\n                            </div>\n                            <div class="card data-table">\n                                <p></p>\n                                <div class="block">\n                                    <div class="row">\n                                        <button class="col button button-outline" id="btnExport" onclick="exportReportToExcel(\'oman\', \'Laporan Transaksi Reversal.xlsx\')">Export To Excel</button>\n                                    </div>\n                                </div>\n\n                                <p id="mydstable"></p>\n                                \n                                <div class="data-table-footer">\n                                    <div class="data-table-rows-select">\n                                        Per page:\n                                        <div class="input input-dropdown">\n                                            <select>\n                                            <option value="5">5</option>\n                                            <option value="10">10</option>\n                                            <option value="25">25</option>\n                                            <option value="all">All</option>\n                                            </select>\n                                        </div>\n                                        </div>\n                                        <div class="data-table-pagination">\n                                        <span class="data-table-pagination-label">1-5 of 10</span>\n                                        <a href="#" class="link disabled">\n                                            <i class="icon icon-prev color-gray"></i>\n                                        </a>\n                                        <a href="#" class="link">\n                                            <i class="icon icon-next color-gray"></i>\n                                        </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>' : "5" == a ? _myPageContent = '<div class="block-title"><b>Laporan Topup</b></div>\n                            <form class="list" id="form-laptopup">\n                                <ul>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Tanggal Topup</div>\n                                        <div class="item-input-wrap">\n                                        <input type="date" value="" name="tanggal" placeholder="dd-mm-yyyy">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-inner">\n                                        <div class="item-input-wrap">\n                                        <input type="text" id="respon" name="respon" class="text-color-deeporange align-content-center" disabled>\n                                        </div>\n                                    </div>\n                                </li>\n                                </ul>\n                            </form>\n                            <div class="block block-strong row">\n                                <div class="col"><a class="button button-fill color-green convert-form-to-data" href="#" onClick="loadData(\'laptopup\')">Proses</a></div>\n                            </div>\n                            <div class="card data-table">\n                                <p></p>\n                                <div class="block">\n                                    <div class="row">\n                                        <button class="col button button-outline" id="btnExport" onclick="exportReportToExcel(\'oman\', \'Laporan Topup.xlsx\')">Export To Excel</button>\n                                    </div>\n                                </div>\n                                \n                                <p id="mydstable"></p>\n                                \n                                <div class="data-table-footer">\n                                    <div class="data-table-rows-select">\n                                        Per page:\n                                        <div class="input input-dropdown">\n                                            <select>\n                                            <option value="5">5</option>\n                                            <option value="10">10</option>\n                                            <option value="25">25</option>\n                                            <option value="all">All</option>\n                                            </select>\n                                        </div>\n                                        </div>\n                                        <div class="data-table-pagination">\n                                        <span class="data-table-pagination-label">1-5 of 10</span>\n                                        <a href="#" class="link disabled">\n                                            <i class="icon icon-prev color-gray"></i>\n                                        </a>\n                                        <a href="#" class="link">\n                                            <i class="icon icon-next color-gray"></i>\n                                        </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>' : "6" == a ? _myPageContent = '<div class="block-title"><b>Daftar dan Harga Produk</b></div>\n                            <div class="block block-strong">\n                                <div class="col">\n                                    <a class="button button-fill color-green convert-form-to-data" href="#" onClick="loadData(\'lapproduk\')">Tampilkan daftar dan harga produk</a>\n                                </div>\n\n                                <div class="col">\n                                    <div class="item-inner">\n                                        <p></p>\n                                        <div class="item-input-wrap">\n                                        <input class="text-color-purple" type="text" id="myprod" name="myprod" onkeyup="search_table()" placeholder="Tuliskan nama produk atau nama produk yang akan dicari">\n                                        <span class="input-clear-button"></span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="card data-table">\n                                <p></p>\n                                <div class="block">\n                                    <div class="row">\n                                        <button class="col button button-outline" id="btnExport" onclick="exportReportToExcel(\'oman\', \'Daftar Produk dan Harga Produk.xlsx\')">Export To Excel</button>\n                                    </div>\n                                </div>\n\n                                <p id="mydstable"></p>\n                                \n                                <div class="data-table-footer">\n                                    <div class="data-table-rows-select">\n                                        Per page:\n                                        <div class="input input-dropdown">\n                                            <select>\n                                            <option value="5">5</option>\n                                            <option value="10">10</option>\n                                            <option value="25">25</option>\n                                            <option value="all">All</option>\n                                            </select>\n                                        </div>\n                                        </div>\n                                        <div class="data-table-pagination">\n                                        <span class="data-table-pagination-label">1-5 of 10</span>\n                                        <a href="#" class="link disabled">\n                                            <i class="icon icon-prev color-gray"></i>\n                                        </a>\n                                        <a href="#" class="link">\n                                            <i class="icon icon-next color-gray"></i>\n                                        </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>' : "7" == a && (_myPageContent = '<div class="block-title"><b>Download File Transaksi/Rekon</b></div>\n                            <form class="list" id="form-download-file">\n                                <ul>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Tanggal Awal</div>\n                                        <div class="item-input-wrap">\n                                        <input type="date" value="" name="tanggal1" placeholder="dd-mm-yyyy">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                <li>\n                                    <div class="item-content item-input">\n                                    <div class="item-inner">\n                                        <div class="item-title item-label">Tanggal Akhir</div>\n                                        <div class="item-input-wrap">\n                                        <input type="date" value="" name="tanggal2" placeholder="dd-mm-yyyy">\n                                        </div>\n                                    </div>\n                                    </div>\n                                </li>\n                                </ul>\n                            </form>\n                            <div class="col">\n                                <div class="col">\n                                    <a class="button button-fill color-green convert-form-to-data" href="#" onClick="loadData(\'download\')">Tampilan File Transaksi/Rekon</a>\n                                </div>\n                            </div>\n                            <div class="card data-table">\n                                <p></p>\n                                <div class="block">\n                                    <div class="row">\n                                        <button class="col button button-outline" id="btnExport" onclick="exportReportToExcel(\'oman\', \'File Transaksi.xlsx\')">Export To Excel</button>\n                                    </div>\n                                </div>\n\n                                <p id="mydstable"></p>\n                                \n                                <div class="data-table-footer">\n                                    <div class="data-table-rows-select">\n                                        Per page:\n                                        <div class="input input-dropdown">\n                                            <select>\n                                            <option value="5">5</option>\n                                            <option value="10">10</option>\n                                            <option value="25">25</option>\n                                            <option value="all">All</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                    <div class="data-table-pagination">\n                                        <span class="data-table-pagination-label">1-5 of 10</span>\n                                        <a href="#" class="link disabled">\n                                            <i class="icon icon-prev color-gray"></i>\n                                        </a>\n                                        <a href="#" class="link">\n                                            <i class="icon icon-next color-gray"></i>\n                                        </a>\n                                    </div>\n                                </div>\n\n                            </div>')
}

function formatRupiah(a, n) {
    var e = a.replace(/[^,\d]/g, "").toString().split(","),
        t = e[0].length % 3,
        i = e[0].substr(0, t),
        o = e[0].substr(t).match(/\d{3}/gi);
    return o && (separator = t ? "." : "", i += separator + o.join(".")), i = null != e[1] ? i + "," + e[1] : i, null == n ? i : i ? "Rp. " + i : ""
}

function loadData(a) {
    app.notification.create({
        icon: '<i class="icon demo-icon">7</i>',
        title: app.name,
        subtitle: "Lacak Transaksi",
        text: "This is a simple notification message",
        closeTimeout: 3e3
    });
    var n = app.toast.create({
        text: "I'm on center",
        position: "center",
        closeTimeout: 3e3
    });
    if ("lacaktransaksi" == a) {
        var e = (e = $$('#form-lacaktransaksi [name="tanggal"]').val()).replace(/[^,\d]/g, "").toString(),
            t = ($$('#form-lacaktransaksi [name="kriteria"]').val(), $$('#form-lacaktransaksi [name="keyword"]').val());
        a = '{"service":"lacakTransaksi","data":{"tgl":"' + e + '","acc":"' + _myAcc + '","key":"' + t + '"}}'
    } else if ("laprekaptrans" == a) t = "Laporan Jumlah Transaksi Tanggal : " + (e = (e = $$('#form-laprekaptrans [name="tanggal"]').val()).replace(/[^,\d]/g, "").toString()), a = '{"service":"getLaporanTrans","data":{"tgl":"' + e + '","acc":"' + _myAcc + '"}}';
    else if ("lapmutasi" == a) t = "Laporan Mutasi Tanggal : " + (e = (e = $$('#form-lapmutasi [name="tanggal"]').val()).replace(/[^,\d]/g, "").toString()), a = '{"service":"getStatements","data":{"tgl":"' + e + '","acc":"' + _myAcc + '","tipe":"1","kdmember":"' + _myAcc + '"}}';
    else if ("laptransrev" == a) t = "Laporan Reversal Tanggal : " + (e = (e = $$('#form-laptransrev [name="tanggal"]').val()).replace(/[^,\d]/g, "").toString()), a = '{"service":"getLaporanBatal","data":{"tgl":"' + e + '","acc":"' + _myAcc + '"}}';
    else if ("laptopup" == a) t = "Laporan Topup Tanggal : " + (e = (e = $$('#form-laptopup [name="tanggal"]').val()).replace(/[^,\d]/g, "").toString()), a = '{"service":"getLaporanInjectManual","data":{"tgl":"' + e + '","acc":"' + _myAcc + '"}}';
    else if ("lapproduk" == a) t = "Daftar Produk dan Harga", a = '{"service":"getProductPriceList","data":{"acc":"' + _myAcc + '"}}';
    else if ("download" == a) {
        var i = (i = $$('#form-download-file [name="tanggal1"]').val()).replace(/[^,\d]/g, "").toString(),
            o = (o = $$('#form-download-file [name="tanggal2"]').val()).replace(/[^,\d]/g, "").toString();
        t = "File Transaksi Tanggal : " + $$('#form-download-file [name="tanggal1"]').val() + " s.d " + $$('#form-download-file [name="tanggal2"]').val(), a = '{"service":"getFileRekon","data":{"acc":"' + _myAcc + '","tgl1":"' + i + '","tgl2":"' + o + '"}}'
    }
    var l = {
        "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        Authorization: _myToken,
        "X-DS-Application-Id": applicationId,
        "X-DS-REST-API-Key": restApiKey,
        "X-DS-GUID": dsguid
    };
    app.preloader.show(), app.request({
        method: "POST",
        headers: l,
        data: a,
        timeout: 2e4,
        contentType: "application/json",
        processData: !1,
        url: dsurl,
        success: function(a) {
            app.preloader.hide();
            var e = JSON.parse(a);
            (_myToken = e.token, n.$el.find(".toast-text").text(e.responMessage), n.open(), $$("#respon").val(e.responMessage), "000" == e.responCode) ? (dsCreateDynamicTable(e.data, t), dsShowHideTable("show")) : ($$('#form-lacaktransaksi [name="respon"]').val(e.responMessage), dsShowHideTable("hide"))
        },
        error: function(a) {
            app.preloader.hide(), app.dialog.alert("Unauthorized, Mohon Login Ulang"), app.popup.close(), app.view.main.router.back("/", !0)
        }
    })
}

function dsCreateDynamicTable(a, n) {
    for (var e = a, t = [], i = 0; i < e.length; i++)
        for (var o in e[i]) - 1 === t.indexOf(o) && t.push(o);
    var l = document.createElement("table");
    l.setAttribute("id", "oman"), l.setAttribute("name", "oman");
    var s = l.insertRow(-1);
    s.setAttribute("class", "border_class");
    for (i = 0; i < t.length; i++) {
        var r = document.createElement("th");
        r.setAttribute("class", "label-cell");
        var d = (d = t[i].replace("_", " ")).toUpperCase();
        r.innerHTML = d, s.appendChild(r)
    }
    for (i = 0; i < e.length; i++) {
        s = l.insertRow(-1);
        for (var c = 0; c < t.length; c++) {
            var p = s.insertCell(-1);
            p.innerHTML = e[i][t[c]], p.setAttribute("class", "label-cell")
        }
    }
    var v = document.getElementById("mydstable");
    v.innerHTML = "", v.appendChild(l);
    var m = l.createTHead().insertRow(0).insertCell(0);
    m.setAttribute("colspan", 7), m.innerHTML = "Hasil Pencarian : " + n
}

function dsShowHideTable(a) {
    document.getElementById("mydstable").style.visibility = "show" == a ? "visible" : "hidden"
}

function setTanggal() {
    var a = new Date,
        n = a.getFullYear().toString() + "-" + (a.getMonth() + 1).toString().padStart(2, 0) + "-" + a.getDate().toString().padStart(2, 0);
    $$('#form-lacaktransaksi [name="tanggal"]').val(n), $$('#form-laprekaptrans [name="tanggal"]').val(n), $$('#form-lapmutasi [name="tanggal"]').val(n), $$('#form-laptransrev [name="tanggal"]').val(n), $$('#form-laptopup [name="tanggal"]').val(n), $$('#form-lapproduk [name="tanggal"]').val(n), $$('#form-download-file [name="tanggal1"]').val(n), $$('#form-download-file [name="tanggal2"]').val(n)
}
window._myAcc = "", window._myName = "", window._myBal = "", window._myPageContent = "", window._myToken = "", $$("#my-login-screen .login-screen-close").on("click", function() {
    $$('#my-login-screen [name="username"]').val(""), $$('#my-login-screen [name="password"]').val("")
}), $$("#my-login-screen .login-button").on("click", function() {
    var a = $$('#my-login-screen [name="username"]').val(),
        n = $$('#my-login-screen [name="password"]').val();
    if ($$('#my-login-screen [name="username"]').val(""), $$('#my-login-screen [name="password"]').val(""), a)
        if (n) {
            app.preloader.show();
            var e = {};
            e.username = a, e.password = n;
            var t = CryptoJS.MD5(n);
            dsguid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            var i = '{"service":"loginws","data":{"param":"' + a + '","param2":"' + t + '","guid":"' + dsguid + '"}}',
                o = {
                    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    Authorization: "8b00f05162d63f1de06dadc47207a2b48aab076805423850dcca54216149f6ec",
                    "X-DS-Application-Id": applicationId,
                    "X-DS-REST-API-Key": restApiKey,
                    "X-DS-GUID": dsguid
                };
            app.request({
                method: "POST",
                headers: o,
                data: i,
                contentType: "application/json",
                processData: !1,
                url: dsurl,
                timeout: 3e4,
                success: function(n) {
                    var e = JSON.parse(n),
                        i = e.responCode,
                        o = e.responMessage;
                    if ("000" == i) {
                        var l = e.data[0];
                        globalReff = JSON.stringify(l);
                        var s = JSON.parse(globalReff).data.split(";");
                        window._myAcc = s[0], window._myName = s[1], window._myBal = s[6], window._myToken = s[7], window._myPageContent = "<p>Hi, <b>" + _myName + "</b><p><p>Selamat datang di Web Monitoring kami..</p><p>Kode Member Anda : <b>" + _myAcc + "</b></p><p>Saldo Aktif Anda saat adalah <b>" + formatRupiah(_myBal, "Rp. ") + "</b></p>", localStorage.setItem("ds", JSON.stringify({
                            user: a,
                            pswd: t,
                            reff: globalReff,
                            myacc: _myAcc,
                            myname: _myName
                        })), app.loginScreen.close("#my-login-screen"), app.dialog.close(), app.views.main.router.navigate("/dashboard/"), app.preloader.hide()
                    } else app.dialog.alert("Gagal login, " + o), app.preloader.hide()
                },
                error: function(a) {
                    app.dialog.alert("Unauthorized"), app.preloader.hide()
                }
            }), app.preloader.hide()
        } else app.dialog.alert("Password harus diisi");
    else app.dialog.alert("Username harus diisi")
});