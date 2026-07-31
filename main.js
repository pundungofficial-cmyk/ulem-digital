const form = document.getElementById("wishForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const presensi = document.getElementById("presensi").value;
    const ucapan = document.getElementById("ucapan").value;

    await addDoc(collection(db, "komentar"), {
        nama,
        presensi,
        ucapan,
        waktu: Date.now()
    });

    const pesan = `*Undangan Digital*

Nama : ${nama}
Presensi : ${presensi}

Ucapan :
${ucapan}`;

    window.open(
      `https://wa.me/6285781459702?text=${encodeURIComponent(pesan)}`,
      "_blank"
    );

    form.reset();

    tampilKomentar();
});

async function tampilKomentar() {
    const list = document.getElementById("listKomentar");
    list.innerHTML = "";

    const data = await getDocs(query(collection(db, "komentar"), orderBy("waktu", "desc")));

    data.forEach((doc) => {
        const d = doc.data();

        list.innerHTML += `
        <div class="card p-3 mt-2">
            <h5>${d.nama}</h5>
            <small>${d.presensi}</small>
            <p>${d.ucapan}</p>
        </div>`;
    });
}

tampilKomentar();