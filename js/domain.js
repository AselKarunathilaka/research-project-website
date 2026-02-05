// JavaScript for Domain Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all domain tabs
    const domainTabs = document.querySelectorAll('.domain-tab');
    const domainPanes = document.querySelectorAll('.domain-pane');
    
    // Add click event to each tab
    domainTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            domainTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the target pane
            const targetId = this.getAttribute('data-target');
            
            // Hide all panes
            domainPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show the target pane
            document.getElementById(targetId).classList.add('active');
            
            // Use the global refreshAOS function to reload animations
            if (typeof window.refreshAOS === 'function') {
                window.refreshAOS();
            } else {
                // Fallback if the global function is not available
                setTimeout(function() {
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                    // Force scroll event to trigger lazy loading elements
                    window.dispatchEvent(new Event('scroll'));
                }, 200);
            }
        });
    });
});

// Re-initialize AOS when user scrolls after tab switch
window.addEventListener('scroll', function() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, { passive: true });
