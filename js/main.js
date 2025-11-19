import{jobList}from"./jobs.js";
const container = document.getElementById("job-container");

jobList.forEach(job => {
    const jobElement = document.createElement("div");
    jobElement.className = "card mb-3 mx-auto rounded contact";
    jobElement.style.width = "100%";
    jobElement.innerHTML = `
    <div class="row g-0">
      <div class="col-md-2">
        <img src="${job.img}" class="img rounded-start card-img mx-auto img-fluid" alt="...">
      </div>
      <div class="col-md-10">
        <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title" id="jobs">${job.title}</h5>
          <button class="btn btn-border-primary"><h6 class="card-title end align-middle">RP <span id="salary">${job.salary}</span> - RP <span id="maxsalary">${job.maxSalary}</span> per-month</h6>
          </div></button>
          <h6 class="card-title text-secondary" id="company">${job.company}</h6>
          <p class="card-text desc">${job.description}</p>
          <p class="card-footer"><small class="text-body-secondary" id="location">${job.location}</small>
          <p class"card-footer fs-5" id="Type">${job.type}</P>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          
          <button type="button" class="btn btn-primary me-md-2" data-bs-toggle="modal" data-bs-target="#${job.id}">
  Overview
</button>
</div></p>
        </div>
      </div>
    </div>
    `;
    
    container.appendChild(jobElement);
});
const modalContainer = document.getElementById("modal-container");
jobList.forEach(job => {
  const modalElement = document.createElement("div");
  modalElement.innerHTML=`<div class="modal fade" id="${job.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${job.id}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="${job.id}Label">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
              <div class="card" style="width: 100%">
  <img src="${job.img}" class="card-img-top" alt="..." style="width:50%">
  <div class="card-body">
    <h5 class="card-title" id="jobs">${job.title}</h5>
    <button class="btn btn-border-primary"><h6 class="card-title">RP <span id="salary">${job.salary}</span> - RP <span id="maxsalary">${job.maxSalary}</span> per-month</h6>
          </button>
          <hr/>
    <p class="card-text desc">${job.description}</p>
    <p class="card-footer">${job.location}</p>
  </div>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Apply</button>
      </div>
    </div>
  </div>
</div>`
  modalContainer.appendChild(modalElement);
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
document.getElementById('filterJobs').addEventListener('change', filterJobs);

function filterJobs() {
  const locationValue = document.getElementById('filterLocation').value.toLowerCase();
  const jobsValue = document.getElementById('filterJobs').value.toLowerCase();
  const salaryValue = document.getElementById('filterSalary').value;
  const jobCards = document.querySelectorAll('#job-container .card');

  jobCards.forEach(card => {
    const location = card.querySelector('#location')?.textContent.toLowerCase() || '';
    const jobsType = card.querySelector('#Type')?.textContent.toLowerCase() || '';
    const salaryText = card.querySelector('#salary')?.textContent.replace(/[^\d]/g, '') || '0';
    const maxSalaryText = card.querySelector('#maxsalary')?.textContent.replace(/[^\d]/g, '') || '0';

    const salary = parseInt(salaryText);
    const maxSalary = parseInt(maxSalaryText);

    let locationMatch = !locationValue || location.includes(locationValue);
    let jobsMatch = !jobsValue || jobsType.includes(jobsValue);
    let salaryMatch = true;

    if (salaryValue === '<7000000') {
      salaryMatch = salary < 7000000;
    }  else if (salaryValue === '7000000-8000000') {
  salaryMatch = salary <= 8000000 && maxSalary >= 7000000;
}
 else if (salaryValue === '>8000000') {
      salaryMatch = maxSalary > 8000000;
    }

    if (locationMatch && salaryMatch && jobsMatch) {
      card.style.display = 'block';
      card.classList.add('animate__animated', 'animate__fadeIn');
    } else {
      card.style.display = 'none';
    }
  });
}

const currentPage = window.location.pathname.split("/").pop();


const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  
  if (window.location.href.includes(linkPage))
 {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});
