const dataTooltips = document.querySelectorAll('[data-tooltip]');
dataTooltips.forEach((dataTooltip) => {

  dataTooltip.classList.add('relative');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = dataTooltip.getAttribute('data-tooltip');
  dataTooltip.appendChild(tooltip);

  dataTooltip.addEventListener('mouseover', (e) => {
    tooltip.classList.add('visible');
  });
  dataTooltip.addEventListener('mouseout', () => {
    tooltip.classList.remove('visible');
  });
});