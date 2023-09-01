function formatResume() {
	fetch('resume.json')
	.then(response => response.json())
	.then(data => {
		// return;
		document.title = `${data.name} – Résumé`;
		formatHeader(data);
		formatPhysical(data);
		formatStatement(data);
		formatEducation(data);
		formatExtracurriculars(data);
		formatClassesWorkshops(data);
		formatOtherDetails(data);
		formatAwards(data);
		formatPress(data);
		formatStageExperience(data);
		formatCrewExperience(data);
	});
}

function formatHeader(data) {
	let parts = [data.name];
	if (data.pronouns) parts.push(`<small>(${data.pronouns})</small>`);
	document.querySelector('.name').innerHTML = parts.join(' ');
	document.querySelector('.contact-email').innerHTML = `<a href="mailto:${data.contact.email}"><i class="far fa-fw fa-envelope"></i> ${data.contact.email}</a>`;
	document.querySelector('.contact-phone').innerHTML = `<a href="tel:+1${data.contact.phone}"><i class="far fa-fw fa-mobile-alt"></i> ${data.contact.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</a>`;
	document.querySelector('.contact-website').innerHTML = `<i class="far fa-fw fa-link"></i> ${data.contact.website}`;
}

function formatPhysical(data) {
	let physicalAttributes = [];
	for (let [key, value] of Object.entries(data.physical)) {
		physicalAttributes.push(`<li><span>${key.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() })}:</span> <strong>${value}</strong></li>`);
	}
	document.querySelector('.physical ul').innerHTML = physicalAttributes.join('');
}

function formatStatement(data) {
	document.querySelector('.statement').innerHTML = `<p>${data.statement}</p>`;
}

function formatEducation(data) {
	document.querySelector('.education ul').innerHTML = '';
	data.education.schools.forEach(school => {
		let thisSchool = document.createElement('li');
		let schoolHeader = document.createElement('header');
		let schoolDetails = document.createElement('div');
		let schoolName = document.createElement('span');
		schoolName.className = 'school-name';
		schoolName.innerHTML = school.name;
		let schoolLocation = document.createElement('span');
		schoolLocation.className = 'school-location';
		schoolLocation.innerHTML = school.location;
		schoolDetails.appendChild(schoolName);
		schoolDetails.appendChild(schoolLocation);
		let schoolDates = document.createElement('div');
		schoolDates.className = 'school-dates';
		schoolDates.innerHTML = school.dates;
		schoolHeader.appendChild(schoolDetails);
		schoolHeader.appendChild(schoolDates);
		thisSchool.appendChild(schoolHeader);
		if (school.graduation || school.gpa) {
			let schoolTags = document.createElement('div');
			schoolTags.className = 'school-tags';
			if (school.graduation) {
				let graduation = document.createElement('div');
				graduation.innerHTML = `Expected Graduation: <strong>${school.graduation}</strong>`;
				schoolTags.appendChild(graduation);
			}
			if (school.gpa) {
				let graduation = document.createElement('div');
				graduation.innerHTML = `GPA: <strong>${school.gpa}</strong>`;
				schoolTags.appendChild(graduation);
			}
			thisSchool.appendChild(schoolTags);
		}
		let schoolNotes = document.createElement('ul');
		school.notes.forEach(note => {
			let schoolNote = document.createElement('li');
			schoolNote.innerHTML = `<p>${note}</p>`;
			schoolNotes.appendChild(schoolNote);
		});
		thisSchool.appendChild(schoolNotes);
		document.querySelector('.education ul').appendChild(thisSchool);
	});
}

function formatExtracurriculars(data) {
	document.querySelector('.extracurriculars ul').innerHTML = '';
	data.education.extracurriculars.forEach(item => {
		let thisItem = document.createElement('li');
		let title = document.createElement('header');
		title.innerHTML = item.title;
		thisItem.appendChild(title);
		if (item.details) {
			let details = document.createElement('p');
			details.innerHTML = item.details;
			thisItem.appendChild(details);
		}
		let dates = document.createElement('footer');
		dates.innerHTML = item.dates;
		thisItem.appendChild(dates);
		document.querySelector('.extracurriculars ul').appendChild(thisItem);
	});
}

function formatClassesWorkshops(data) {
	document.querySelector('.classes-workshops ul').innerHTML = '';
	data.education.classes_workshops.forEach(item => {
		let thisItem = document.createElement('li');
		let title = document.createElement('header');
		title.innerHTML = item.title;
		thisItem.appendChild(title);
		let details = document.createElement('p');
		details.innerHTML = item.details;
		thisItem.appendChild(details);
		let dates = document.createElement('footer');
		dates.innerHTML = item.dates;
		thisItem.appendChild(dates);
		document.querySelector('.classes-workshops ul').appendChild(thisItem);
	});
}

function formatOtherDetails(data) {
	document.querySelector('.other ul').innerHTML = '';
	data.other_notes.forEach(item => {
		let thisItem = document.createElement('li');
		thisItem.innerHTML = `<p>${item}</p>`;
		document.querySelector('.other ul').appendChild(thisItem);
	});
}

function formatAwards(data) {
	document.querySelector('.awards-nominations ul').innerHTML = '';
	data.awards.forEach(item => {
		let thisItem = document.createElement('li');
		let details = document.createElement('p');
		details.innerHTML = item.text;
		thisItem.appendChild(details);
		if (item.link) {
			let footer = document.createElement('footer');
			let link = document.createElement('a');
			link.innerHTML = item.link.text;
			link.href = item.link.url;
			link.setAttribute("target", "_blank");
			footer.appendChild(link);
			thisItem.appendChild(footer);
		}
		document.querySelector('.awards-nominations ul').appendChild(thisItem);
	});
}

function formatPress(data) {
	document.querySelector('.press ul').innerHTML = '';
	data.press.forEach(item => {
		let thisItem = document.createElement('li');
		let details = document.createElement('p');
		details.innerHTML = `&ldquo;${item.text}&rdquo;`;
		thisItem.appendChild(details);
		if (item.link) {
			let footer = document.createElement('footer');
			let link = document.createElement('a');
			link.innerHTML = item.link.text;
			link.href = item.link.url;
			link.setAttribute("target", "_blank");
			footer.appendChild(link);
			thisItem.appendChild(footer);
		}
		document.querySelector('.press ul').appendChild(thisItem);
	});
}

function formatStageExperience(data) {
	document.querySelector('.stage-experience ol').innerHTML = `<li><div class="show-date">Date</div><div class="show">Show &amp; Role</div><div class="company">Company &amp; Director</div></li>`;
	data.acting_experience.forEach(item => {
		let thisItem = document.createElement('li');
		let showDate = document.createElement('div');
		showDate.className = 'show-date';
		showDate.innerHTML = item.date;
		thisItem.appendChild(showDate);
		let show = document.createElement('div');
		show.className = 'show';
		let showTitle = document.createElement('div');
		showTitle.className = 'show-title';
		showTitle.innerHTML = item.title;
		show.appendChild(showTitle);
		let showRole = document.createElement('div');
		showRole.className = 'show-role';
		showRole.innerHTML = `<span>Role:</span> ${item.role}`;
		show.appendChild(showRole);
		thisItem.appendChild(show);
		let company = document.createElement('div');
		company.className = 'company';
		let companyTitle = document.createElement('div');
		companyTitle.className = 'company-title';
		companyTitle.innerHTML = item.company;
		company.appendChild(companyTitle);
		let director = document.createElement('div');
		director.className = 'show-director';
		director.innerHTML = `<span>Director:</span> ${item.director}`;
		company.appendChild(director);
		thisItem.appendChild(company);
		document.querySelector('.stage-experience ol').appendChild(thisItem);
	});
}

function formatCrewExperience(data) {
	document.querySelector('.crew-experience ol').innerHTML = `<li><div class="show-date">Date</div><div class="show">Show &amp; Role</div><div class="company">Company &amp; Director</div></li>`;
	data.crew_experience.forEach(item => {
		let thisItem = document.createElement('li');
		let showDate = document.createElement('div');
		showDate.className = 'show-date';
		showDate.innerHTML = item.date;
		thisItem.appendChild(showDate);
		let show = document.createElement('div');
		show.className = 'show';
		let showTitle = document.createElement('div');
		showTitle.className = 'show-title';
		showTitle.innerHTML = item.title;
		show.appendChild(showTitle);
		let showRole = document.createElement('div');
		showRole.className = 'show-role';
		showRole.innerHTML = `<span>Role:</span> ${item.role}`;
		show.appendChild(showRole);
		thisItem.appendChild(show);
		let company = document.createElement('div');
		company.className = 'company';
		let companyTitle = document.createElement('div');
		companyTitle.className = 'company-title';
		companyTitle.innerHTML = item.company;
		company.appendChild(companyTitle);
		let director = document.createElement('div');
		director.className = 'show-director';
		director.innerHTML = `<span>Director:</span> ${item.director}`;
		company.appendChild(director);
		thisItem.appendChild(company);
		document.querySelector('.crew-experience ol').appendChild(thisItem);
	});
}

formatResume();

// Generate random photos.
/*
let photos = [];
let photoCount = Math.floor(Math.random() * 8) + 3;
for (let i = 0; i < photoCount; i++) {
	let width = Math.floor(Math.random() * 1001) + 1000;
	let height = Math.floor(Math.random() * 801) + 700;
	photos.push(`<li><img src="https://picsum.photos/${width}/${height}/?random=${i}"></li>`);
}

document.querySelector('.photos ul').innerHTML = photos.join('');
*/