import{jobList}from"./jobs.js";
const container = document.getElementById("job-container");

jobList.forEach(job => {
    const jobElement = document.createElement("div");
    jobElement.className = "card mb-3 mx-auto rounded";
    jobElement.style.width = "100%";
    jobElement.innerHTML = `
    <div class="row g-0">
      <div class="col-md-2">
        <img src="${job.img}" class="img rounded-start card-img" alt="...">
      </div>
      <div class="col-md-10">
        <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title" id="jobs">${job.title}</h5>
          <h6 class="card-title end align-middle">RP <span id="salary">${job.salary}</span> - RP <span id="maxsalary">${job.maxSalary}</span> per-month</h6>
          </div>
          <h6 class="card-title text-secondary" id="company">${job.company}</h6>
          <p class="card-text">${job.description}</p>
          <p class="card-footer"><small class="text-body-secondary" id="location">${job.location}</small></p>
        </div>
      </div>
    </div>
    `;
    container.appendChild(jobElement);
});
document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const jobCards = document.querySelectorAll('#job-container .card');

  jobCards.forEach(card => {
    const title = card.querySelector('#jobs')?.textContent.toLowerCase() || '';
    const company = card.querySelector('#company')?.textContent.toLowerCase() || '';
    const location = card.querySelector('#location')?.textContent.toLowerCase() || '';

    if (title.includes(keyword) || company.includes(keyword)|| location.includes(keyword)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
document.getElementById('filterLocation').addEventListener('change', filterJobs);
document.getElementById('filterSalary').addEventListener('change', filterJobs);

function filterJobs() {
  const locationValue = document.getElementById('filterLocation').value.toLowerCase();
  const salaryValue = document.getElementById('filterSalary').value;
  const jobCards = document.querySelectorAll('#job-container .card');

  jobCards.forEach(card => {
    const location = card.querySelector('#location')?.textContent.toLowerCase() || '';
    const salaryText = card.querySelector('#salary')?.textContent.replace(/[^\d]/g, '') || '0';
    const maxSalaryText = card.querySelector('#maxsalary')?.textContent.replace(/[^\d]/g, '') || '0';

    const salary = parseInt(salaryText);
    const maxSalary = parseInt(maxSalaryText);

    let locationMatch = !locationValue || location.includes(locationValue);
    let salaryMatch = true;

    if (salaryValue === '<7000000') {
      salaryMatch = salary < 7000000;
    }  else if (salaryValue === '7000000-8000000') {
  salaryMatch = salary <= 8000000 && maxSalary >= 7000000;
}
 else if (salaryValue === '>8000000') {
      salaryMatch = maxSalary > 8000000;
    }

    if (locationMatch && salaryMatch) {
      card.style.display = 'block';
      card.classList.add('animate__animated', 'animate__fadeIn');
    } else {
      card.style.display = 'none';
    }
  });
}
// Ambil path dari URL saat ini (misalnya: 'jobs.html')
const currentPage = window.location.pathname.split("/").pop();

// Ambil semua link di navbar
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  // Bandingkan dengan halaman saat ini
  if (window.location.href.includes(linkPage))
 {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});
