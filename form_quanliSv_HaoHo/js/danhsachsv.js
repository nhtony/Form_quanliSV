function DanhSachSinhVien() {

    this.listSV = [];

    this.ThemMoiSinhVien = function (sinhVien) {
        this.listSV.push(sinhVien);
    }

    this.CapNhatSinhVien = function (sinhVien) {
        var bienSinhVien;
        this.listSV.map(function (item) {
            bienSinhVien = item;
            if (bienSinhVien.maSV === sinhVien.maSV) {
                bienSinhVien.hoTen = sinhVien.hoTen;
                bienSinhVien.tuoi = sinhVien.tuoi;
                bienSinhVien.email = sinhVien.email;
                bienSinhVien.soDT = sinhVien.soDT;
                bienSinhVien.diemToan = sinhVien.diemToan;
                bienSinhVien.diemLy = sinhVien.diemLy;
                bienSinhVien.diemHoa = sinhVien.diemHoa;
                bienSinhVien.diemTB = sinhVien.diemTB;
                return;
            }
        });
    }

    this.XoaSinhVien = function (maSV) {
        var viTri = this.LayViTri(maSV);
        if (viTri > -1) {
            this.listSV.splice(viTri, 1);
        }
    }

    this.TimKiemSinhVien = function (chuoiTimKiem) {
        var mangTimKiem = [];
        var sinhvien;
        this.listSV.map(function (item) {
            sinhvien = item;

            if (sinhvien.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {

                mangTimKiem.push(sinhvien);
            }
        });
        return mangTimKiem;
    }

    this.layThongTinSinhVien = function (ma) {
        var DSSV = JSON.parse(localStorage.getItem("DSSV"));
        var sinhvien;
        DSSV.map(function (item) {
            if (item.maSV === ma) {
                sinhvien = item;
                return;
            }
        });
        return sinhvien;
    }

    this.LayViTri = function (maSV) {
        // Duyệt ds người dùng
        var sinhvien;
        for (let i = 0; i < this.listSV.length; i++) {
            // Lấy ra người dùng ở vị trí thứ i
            sinhvien = this.listSV[i];
            if (sinhvien.maSV === maSV.toString()) {
                return i; // Tìm thấy => trả về vị trí
            }
        }
        return -1; // Không tìm thấy => Trả về -1
    }


}



