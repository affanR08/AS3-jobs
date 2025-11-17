const contactlist = [
  {
    judul :"whatsApp",
    contact:"+6219832942",
    icon:'bx bxl-whatsapp-square mx-1'
  },
  {
    judul:"Email",
    contact:"affanrabbani19@gmail.com",
    icon:'bx bxl-gmail mx-1'
  },
  {
    judul:"Github",
    contact: "affanR08.github.io",
    icon:'bx bxl-github mx-1'
  },
  {
    judul:"LinkedIn",
    contact: `<a href=>https://www.linkedin.com/in/feint-ii/</a>`,
    icon:'bx bxl-linkedin-square mx-1'
  },
  {
    judul:"Home Address",
    contact: "North cikarang, bekasi regency, west java, indonesia.",
    icon:'bx bx-home mx-1'
  }
];
const concontainer = document.getElementById("contact")
contactlist.forEach(contacts=>{
    const conelement = document.createElement("div");
    conelement.className="col";
    conelement.innerHTML=`
    <div class="card contact h-100">
      <div class="card-body">
        <h5 class="card-title"><i class='${contacts.icon}'></i>${contacts.judul}</h5>
        <p class="card-text">${contacts.contact}</p>
      </div>
    </div>
    `;
    concontainer.appendChild(conelement)
})