export const toggleDarkMode = () => {
    document.body.classList.toggle('dark'); 
  
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };
  
  // Add other theme-related utilities as needed