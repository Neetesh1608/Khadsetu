
    // --- NEW: Load User Data from Memory ---
    function loadUserData() {
      const savedName = localStorage.getItem('khadsetu_user_name');
      
      if (savedName) {
        document.querySelector('.welcome-text h1').innerText = `Welcome back, ${savedName}!`;
        document.querySelector('.user-name').innerText = savedName;
      }
    }

    // --- Simple logic for the AI Calculator ---
    function calculateFertilizer() {
      const crop = document.getElementById('crop-select').value;
      const acres = parseFloat(document.getElementById('acre-input').value) || 0;
      
      let ureaPerAcre = 0;
      let dapPerAcre = 0;

      if (crop === 'wheat') { ureaPerAcre = 1; dapPerAcre = 0.5; }
      if (crop === 'rice') { ureaPerAcre = 1.5; dapPerAcre = 1; }
      if (crop === 'sugarcane') { ureaPerAcre = 2; dapPerAcre = 1.5; }

      const totalUrea = Math.ceil(ureaPerAcre * acres);
      const totalDAP = Math.ceil(dapPerAcre * acres);

      document.getElementById('urea-val').innerText = `${totalUrea} Bag${totalUrea > 1 ? 's' : ''} Urea`;
      document.getElementById('dap-val').innerText = `${totalDAP} Bag${totalDAP > 1 ? 's' : ''} DAP`;
    }

    // --- Initialize EVERYTHING on load ---
    window.onload = function() {
      loadUserData();
      calculateFertilizer();
    };

    // --- NEW: Clear memory on logout ---
    function logout() {
      localStorage.removeItem('khadsetu_user_name');
      window.location.href = "login.html";
    }