$(document).ready(function () {

    resetForm();
    LoadDuLieu();

    var danhSachSV = new DanhSachSinhVien();
    var Notify = {
        formatErr: 'Dữ liệu không hợp lệ!',
        requiredErr: 'Vui lòng điền thông tin!',
        mailErr: 'Email không hợp lệ!',
        overErr: 'Vui lòng nhập điểm nhỏ hơn 10!',
        conflictErr: 'Tài khoản bị trùng!',
    }
    // Tạo event change cho các input
    $("#MaSV").change(function () {
        checkMaSV();
    });

    $("#HoTen").change(function () {
        checkHoTen();
    });

    $("#Tuoi").change(function () {
        checkTuoi();
    });

    $("#Email").change(function () {
        checkMail();
    });

    $("#SoDT").change(function () {
        checkSoDT();
    });

    $("#DiemToan").change(function () {
        checkDiemToan();
    });

    $("#DiemLy").change(function () {
        checkDiemLy();
    });

    $("#DiemHoa").change(function () {
        checkDiemHoa();
    });

    $('#btnThemMoi').click(function () {
        resetForm();

    });
    
    $('#btnThem').click(function () {
        if (validate()) {
            let maSV = $("#MaSV").val();
            let hoTen = $("#HoTen").val();
            let tuoi = $("#Tuoi").val();
            let email = $("#Email").val();
            let soDT = $("#SoDT").val();
            let diemToan = $("#DiemToan").val();
            let diemLy = $("#DiemLy").val();
            let diemHoa = $("#DiemHoa").val();

            let sinhVien = new SinhVien(maSV, hoTen, tuoi, email, soDT, diemToan, diemLy, diemHoa);
            // sinhVien.TinhDiemTrungBinh();
            

            danhSachSV.ThemMoiSinhVien(sinhVien);
            console.log(danhSachSV.listSV);
            SetLocalStore(danhSachSV.listSV);
            LoadDuLieu();

        }
    });

    $('body').delegate('#btnSua', 'click', function () {
        var ma = $(this).data('masv');
        var sinhvienSua = danhSachSV.layThongTinSinhVien(ma);

        $(".modal-title").html("Sửa thông tin người dùng");
        $("#btnCapNhat").css('display', 'block');
        $("#btnThem").css('display', 'none');

        $("#MaSV").attr('disabled', 'disabled');
        $("#MaSV").css('background-color', '#dcdde1');

        $("#MaSV").val(sinhvienSua.maSV);
        $("#HoTen").val(sinhvienSua.hoTen);
        $("#Tuoi").val(sinhvienSua.tuoi);
        $("#Email").val(sinhvienSua.email);
        $("#SoDT").val(sinhvienSua.soDT);
        $("#DiemToan").val(sinhvienSua.diemToan);
        $("#DiemLy").val(sinhvienSua.diemLy);
        $("#DiemHoa").val(sinhvienSua.diemHoa);

    });

    $('body').delegate('#btnCapNhat', 'click', function () {

        let maSV = $("#MaSV").val();
        let hoTen = $("#HoTen").val();
        let tuoi = $("#Tuoi").val();
        let email = $("#Email").val();
        let soDT = $("#SoDT").val();
        let diemToan = $("#DiemToan").val();
        let diemLy = $("#DiemLy").val();
        let diemHoa = $("#DiemHoa").val();

        let sinhVien = new SinhVien(maSV, hoTen, tuoi, email, soDT, diemToan, diemLy, diemHoa);
        // sinhVien.TinhDiemTrungBinh();

        danhSachSV.CapNhatSinhVien(sinhVien);
        SetLocalStore(danhSachSV.listSV);
        LoadDuLieu();

    });

    $('body').delegate('#btnXoa', 'click', function () {
        let ma = $(this).data('masv');
        let sinhvienSua = danhSachSV.layThongTinSinhVien(ma);
        danhSachSV.XoaSinhVien(sinhvienSua.maSV);
        SetLocalStore(danhSachSV.listSV);
        LoadDuLieu();
    });

    $("#searchName").keyup(function () {
        let chuoiTimKiem = $("#searchName").val();
        let mangTimKiem = danhSachSV.TimKiemSinhVien(chuoiTimKiem);
        SetLocalStore(mangTimKiem);
        LoadDuLieu();
    });

    $("#mySeclect").change(function () {
        let noidungSapXep = getListBoxValue();
        let cachXep = getRidioButtonValue();
        console.log(noidungSapXep);
        console.log(cachXep);
        SapXep(noidungSapXep, cachXep);
    });

    $("#myRadioBtn").on("click", function () {
        let noidungSapXep = getListBoxValue();
        let cachXep = getRidioButtonValue();
        console.log(noidungSapXep);
        console.log(cachXep);
        SapXep(noidungSapXep, cachXep);
    });

    function getListBoxValue() {
        let lbValue = $("#mySeclect").prop('value');
        return lbValue;
    }

    function getRidioButtonValue() {
        let lbValue = $("input[name='gender']:checked").val();
        return lbValue;
    }
    // Check hết tất cả input
    function validate() {
        let state = 0;
        if (checkMaSV()) {
            state++;
        }
        if (checkHoTen()) {
            state++;
        }
        if (checkTuoi()) {
            state++;
        }
        if (checkMail()) {
            state++;
        }
        if (checkSoDT()) {
            state++;
        }
        if (checkDiemToan()) {
            state++;
        }
        if (checkDiemLy()) {
            state++;
        }
        if (checkDiemHoa()) {
            state++;
        }
        return (state === 8) ? true : false;
    }

    function checkMaSV() {
        let status = false;
        let maSV = $("#MaSV").val();
        if (isEmpty(maSV)) {
            showNotify("#tbMaSV", Notify.requiredErr);
        }
        else {
            if (conflict(maSV)) {
                showNotify("#tbMaSV", Notify.conflictErr);
            }
            else {
                hideNotify("#tbMaSV");
                if (!allLetters(maSV)) {
                    showNotify("#tbMaSV", Notify.formatErr);
                }
                else {
                    hideNotify("#tbMaSV");
                    status = true;
                }
            }

        }
        return status;
    }

    function checkHoTen() {
        let status = false;
        let hoTen = $("#HoTen").val();
        if (isEmpty(hoTen)) {
            showNotify("#tbHoTen", Notify.requiredErr);
        }
        else {
            hideNotify("#tbHoTen");
            if (!allLetters(hoTen)) {
                showNotify("#tbHoTen", Notify.formatErr);
            }
            else {
                hideNotify("#tbHoTen");
                status = true;
            }
        }
        return status;
    }

    function checkTuoi() {
        let status = false;
        let tuoi = $("#Tuoi").val();
        if (isEmpty(tuoi)) {
            showNotify("#tbTuoi", Notify.requiredErr);
        }
        else {
            hideNotify("#tbTuoi");
            if (!allNumberic(tuoi)) {
                showNotify("#tbTuoi", Notify.formatErr);
            }
            else {
                hideNotify("#tbTuoi");
                status = true;
            }
        }
        return status;
    }

    function checkMail() {
        let status = false;
        let email = $("#Email").val();
        if (isEmpty(email)) {
            showNotify("#tbEmail", Notify.requiredErr);
        }
        else {
            hideNotify("#tbEmail");
            if (!isFormat(email)) {
                showNotify("#tbEmail", Notify.mailErr);
            }
            else {
                hideNotify("#tbEmail");
                status = true;
            }
        }
        return status;
    }

    function checkSoDT() {
        let status = false;
        let soDT = $("#SoDT").val();
        if (isEmpty(soDT)) {
            showNotify("#tbSoDT", Notify.requiredErr);
        }
        else {

            hideNotify("#tbSoDT");
            if (!allNumberic(soDT)) {
                showNotify("#tbSoDT", Notify.formatErr);
            }
            else {
                hideNotify("#tbSoDT");
                status = true;
            }
        }
        return status;
    }

    function checkDiemToan() {
        let status = false;
        let diemToan = $("#DiemToan").val();
        if (isEmpty(diemToan)) {
            showNotify("#tbDiemToan", Notify.requiredErr);
        }
        else {
            if (isOVerTen(diemToan)) {
                showNotify("#tbDiemToan", Notify.overErr);
            }
            else {
                hideNotify("#tbDiemToan");
                if (!allNumberic(diemToan)) {
                    showNotify("#tbDiemToan", Notify.formatErr);
                }
                else {
                    hideNotify("#tbDiemToan");
                    status = true;
                }
            }

        }
        return status;
    }

    function checkDiemLy() {
        let status = false;
        let diemLy = $("#DiemLy").val();
        if (isEmpty(diemLy)) {
            showNotify("#tbDiemLy", Notify.requiredErr);
        }
        else {
            if (isOVerTen(diemLy)) {
                showNotify("#tbDiemLy", Notify.overErr);
            }
            else {
                hideNotify("#tbDiemLy");
                if (!allNumberic(diemLy)) {
                    showNotify("#tbDiemLy", Notify.formatErr);
                }
                else {
                    hideNotify("#tbDiemLy");
                    status = true;
                }
            }

        }
        return status;
    }

    function checkDiemHoa() {
        let status = false;
        let diemHoa = $("#DiemHoa").val();
        if (isEmpty(diemHoa)) {
            showNotify("#tbDiemHoa", Notify.requiredErr);
        }
        else {
            if (isOVerTen(diemHoa)) {
                showNotify("#tbDiemHoa", Notify.overErr);
            }
            else {
                hideNotify("#tbDiemHoa");
                if (!allNumberic(diemHoa)) {
                    showNotify("#tbDiemHoa", Notify.formatErr);
                }
                else {
                    hideNotify("#tbDiemHoa");
                    status = true;
                }
            }
        }
        return status;
    }

    function isEmpty(txtInput) {
        return (txtInput.length < 1) ? true : false;
    }

    function allLetters(txtInput) {
        const letters = /^[A-Za-z0-9 ]+$/;
        return (txtInput.match(letters)) ? true : false;
    }

    function allNumberic(txtInput) {
        const numbers = /^[0-9]+$/;
        return (txtInput.match(numbers)) ? true : false;
    }

    function isFormat(txtInput) {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (txtInput.match(mailformat)) ? true : false;
    }

    function isOVerTen(txtInput) {
        return (txtInput > 10) ? true : false;
    }

    function conflict(txtInput) {
        let state = false;
        danhSachSV.listSV.map(function (item) {
            if (txtInput === item.maSV) {
                state = true;
            }
        });
        return state;
    }

    function resetForm() {
        $("#MaSV").val('');
        $("#MaSV").removeAttr('disabled');
        $("#MaSV").css('background-color', 'transparent');
        $("#HoTen").val('');
        $("#Tuoi").val('');
        $("#Email").val('');
        $("#SoDT").val('');
        $("#DiemToan").val('');
        $("#DiemLy").val('');
        $("#DiemHoa").val('');
        $("#btnCapNhat").css('display', 'none');
        $("#btnThem").css('display', 'block');
        $("input[value='tang']").prop("checked", true);

    }

    function showNotify(notifyID, notifyContent) {
        $(notifyID).html(notifyContent);
        $(notifyID).show();
    }
    function hideNotify(notifyID) {
        $(notifyID).html('');
        $(notifyID).hide();
    }

    function SapXep(noidungSapXep, cachXep) {
        let mangSinhVien = GetLocalStore();
        let mangDiem = [];
        let mangTen = [];
        let mangDaXep = [];

        switch (noidungSapXep) {

            case 'ten':

                mangSinhVien.map(function (ten) {
                    mangTen.push(ten.hoTen);
                });

                mangTen.sort();
                if (cachXep === 'tang') {
                    mangTen.sort();
                }
                else if (cachXep === 'giam') {
                    mangTen.reverse();
                }

                for (let index = 0; index < mangTen.length; index++) {
                    for (let i = 0; i < mangSinhVien.length; i++) {
                        if (mangTen[index] === mangSinhVien[i].hoTen) {
                            mangDaXep.push(mangSinhVien[i])
                        }
                    }
                }
                break;

            case 'diem':

                mangSinhVien.map(function (diem) {
                    mangDiem.push(diem.diemTB);
                });

                mangDiem.sort();
                if (cachXep === 'tang') {
                    mangDiem.sort();
                }
                else if (cachXep === 'giam') {
                    mangDiem.reverse();
                }

                for (let index = 0; index < mangDiem.length; index++) {
                    for (let i = 0; i < mangSinhVien.length; i++) {
                        if (mangDiem[index] === mangSinhVien[i].diemTB) {
                            mangDaXep.push(mangSinhVien[i])
                        }
                    }
                }
                break;
        }

        TaoBang(mangDaXep);
    }


    function SetLocalStore(mangSinhVien) {
        localStorage.setItem("DSSV", JSON.stringify(mangSinhVien));
    }

    function GetLocalStore() {
        let mangSinhVien = [];
        if (localStorage.getItem('DSSV') != null) {
            let chuoi = localStorage.getItem('DSSV');
            mangSinhVien = JSON.parse(chuoi);
        }
        return mangSinhVien;
    }

    function LoadDuLieu() {
        let mangSinhVien = GetLocalStore();
        TaoBang(mangSinhVien);
    }

    function TaoBang(mang) {
        let tblSV = "";
        for (let index = 0; index < mang.length; index++) {
            tblSV += `<tr>
            <td>${index + 1}</td>
            <td>${mang[index].maSV}</td>
            <td>${mang[index].hoTen}</td>
            <td>${mang[index].tuoi}</td>
            <td>${mang[index].email}</td>
            <td>${mang[index].soDT}</td>
            <td>${mang[index].diemToan}</td>
            <td>${mang[index].diemLy}</td>
            <td>${mang[index].diemHoa}</td>
            <td>${mang[index].diemTB}</td>
            <td><button id='btnSua' class='btn btn-primary' data-toggle="modal" data-target="#myModal" data-masv='${mang[index].maSV}'>Sửa<button id='btnXoa' class='btn btn-danger' data-masv='${mang[index].maSV}'>Xóa</button></td>
        </tr>`

        }
        $("#tblSinhVien").html(tblSV);

    }
});
