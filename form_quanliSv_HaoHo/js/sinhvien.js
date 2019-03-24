function SinhVien(maSV, hoTen, tuoi, email, soDT, diemToan, diemLy, diemHoa) {
    this.maSV = maSV;
    this.hoTen = hoTen;
    this.tuoi = tuoi;
    this.email = email;
    this.soDT = soDT;
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
    this.diemTB = TinhDiemTrungBinh();

    function TinhDiemTrungBinh() {
        return ((parseInt(diemToan) + parseInt(diemLy) + parseInt(diemHoa))/3).toFixed(2);
    }
}