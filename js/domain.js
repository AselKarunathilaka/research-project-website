// Accessible project-domain tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabs = Array.from(document.querySelectorAll('.domain-tab'));
    const panes = Array.from(document.querySelectorAll('.domain-pane'));
    if (!tabs.length || !panes.length) return;

    const activateTab = (selectedTab) => {
        const targetId = selectedTab.dataset.target;

        tabs.forEach((tab) => {
            const isSelected = tab === selectedTab;
            tab.classList.toggle('active', isSelected);
            tab.setAttribute('aria-selected', String(isSelected));
            tab.setAttribute('tabindex', isSelected ? '0' : '-1');
        });

        panes.forEach((pane) => {
            const isActive = pane.id === targetId;
            pane.classList.toggle('active', isActive);
            pane.hidden = !isActive;
        });

        if (typeof window.refreshAOS === 'function') window.refreshAOS();
    };

    tabs.forEach((tab, index) => {
        const pane = document.getElementById(tab.dataset.target);
        const tabId = `domain-tab-${index + 1}`;

        tab.id = tabId;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', tab.dataset.target);
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');

        if (pane) {
            pane.setAttribute('role', 'tabpanel');
            pane.setAttribute('aria-labelledby', tabId);
            pane.hidden = !pane.classList.contains('active');
        }

        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', (event) => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();

            let nextIndex = index;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;

            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex]);
        });
    });

    document.querySelector('.domain-tabs').setAttribute('role', 'tablist');
    activateTab(tabs.find((tab) => tab.classList.contains('active')) || tabs[0]);
});
