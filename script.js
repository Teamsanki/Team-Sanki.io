document.querySelector('.profile-card').addEventListener('mousemove', (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  card.style.transform = `rotateY(${x / 25}deg) rotateX(${-y / 25}deg)`;
});

document.querySelector('.profile-card').addEventListener('mouseleave', () => {
  document.querySelector('.profile-card').style.transform = 'rotateY(0) rotateX(0)';
});
