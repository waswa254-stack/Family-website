const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

const photoGroups = [
	{ title: 'The days worth celebrating', description: 'From saying “I do” to the birthdays that bring everyone close, these are the family milestones we keep returning to.', photos: ['1789018421107.jpg', '1789016776042.jpg', '1789016787839.jpg', '1789016838691.jpg'] },
	{ title: 'Little days outside', description: 'Grass under little feet, bright clothes, and the kind of afternoon that turns into a favorite memory.', photos: ['1785427039138.jpg', '1785427042138.jpg', '1786336180427.jpg', '1786451837811.jpg'] },
	{ title: 'Growing into ourselves', description: 'A collection of curious faces and changing seasons, each one catching a new part of childhood.', photos: ['1785166549744.jpg', '1786802350903.jpg', '1786802354602.jpg', '1786820112389.jpg'] },
	{ title: 'Close to home', description: 'The quiet, everyday connection that makes a family feel like home, wherever the day finds us.', photos: ['1788974643759.jpg', '1788978852494.jpg', '1788978860932.jpg', '1788978892143.jpg'] }
];

const photoGroupsElement = document.querySelector('#photo-groups');
let photoIndex = 0;
photoGroups.forEach((group, groupIndex) => {
	const section = document.createElement('section');
	section.className = 'photo-group';
	section.innerHTML = `<div class="group-heading"><div><span class="group-number">0${groupIndex + 1}</span><h3>${group.title}</h3></div><p>${group.description}</p></div><div class="group-grid"></div>`;
	const grid = section.querySelector('.group-grid');
	group.photos.forEach((fileName) => {
		photoIndex += 1;
		const item = document.createElement('button');
		item.className = 'gallery-item';
		item.dataset.full = `images/${fileName}`;
		item.setAttribute('aria-label', `Open family photo ${photoIndex}`);
		item.innerHTML = `<img src="images/${fileName}" alt="${group.title}, photo ${photoIndex}" loading="lazy"><span class="gallery-label">Memory ${String(photoIndex).padStart(2, '0')}</span><span class="view-icon" aria-hidden="true">↗</span>`;
		grid.appendChild(item);
	});
	photoGroupsElement.appendChild(section);
});
document.querySelector('#photo-count').textContent = photoIndex;

menuToggle.addEventListener('click', () => {
	const isOpen = siteNav.classList.toggle('is-open');
	menuToggle.setAttribute('aria-expanded', String(isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

siteNav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		siteNav.classList.remove('is-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open navigation');
	});
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');

document.querySelectorAll('.gallery-item').forEach((item) => {
	item.addEventListener('click', () => {
		const image = item.querySelector('img');
		lightboxImage.src = item.dataset.full;
		lightboxImage.alt = image.alt;
		lightbox.showModal();
	});
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
	if (event.target === lightbox) lightbox.close();
});

const countdownTarget = new Date('2032-12-23T00:00:00+03:00').getTime();
const countdownUnits = {
	days: document.querySelector('#count-days'),
	hours: document.querySelector('#count-hours'),
	minutes: document.querySelector('#count-minutes'),
	seconds: document.querySelector('#count-seconds')
};

function updateCountdown() {
	const remaining = Math.max(0, countdownTarget - Date.now());
	const seconds = Math.floor(remaining / 1000);
	countdownUnits.days.textContent = Math.floor(seconds / 86400);
	countdownUnits.hours.textContent = Math.floor((seconds % 86400) / 3600);
	countdownUnits.minutes.textContent = Math.floor((seconds % 3600) / 60);
	countdownUnits.seconds.textContent = seconds % 60;
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelector('#rsvp-form').addEventListener('submit', (event) => {
	event.preventDefault();
	const name = document.querySelector('#guest-name').value.trim();
	const message = document.querySelector('#form-message');
	message.textContent = `Thank you, ${name}. You’re on the guest list!`;
	event.currentTarget.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
