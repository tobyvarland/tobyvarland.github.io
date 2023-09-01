// Fetch JSON file and load into object.
fetch('resume.json')
.then(response => response.json())
.then(data => {
    // Set page title.
    document.title = `${data.name} – Résumé`;

    // Format physical attributes.
    let physicalAttributes = [];
    for (let [key, value] of Object.entries(data.physical)) {
        physicalAttributes.push(`<li><span>${key.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() })}:</span> <strong>${value}</strong></li>`);
    }

	// Generate random photos.
	let photos = [];
	let photoCount = Math.floor(Math.random() * 8) + 3;
	for (let i = 0; i < photoCount; i++) {
		let width = Math.floor(Math.random() * 1001) + 1000;
		let height = Math.floor(Math.random() * 801) + 700;
		photos.push(`<li><img src="https://picsum.photos/${width}/${height}/?random=${i}"></li>`);
	}

    // Load data into HTML.
    document.querySelector('.name').innerHTML = `${data.name} <small>(${data.pronouns})</small>`;
    document.querySelector('.contact-email').innerHTML = `<a href="mailto:${data.contact.email}"><i class="far fa-fw fa-envelope"></i> ${data.contact.email}</a>`;
    document.querySelector('.contact-phone').innerHTML = `<a href="tel:+1${data.contact.phone}"><i class="far fa-fw fa-mobile-alt"></i> ${data.contact.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</a>`;
    document.querySelector('.contact-website').innerHTML = `<i class="far fa-fw fa-link"></i> ${data.contact.website}`;
    document.querySelector('.physical ul').innerHTML = physicalAttributes.join('');
    document.querySelector('.statement').innerHTML = `<p>${data.statement}</p>`;
	document.querySelector('.photos ul').innerHTML = photos.join('');
});