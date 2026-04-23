
    // --- UI Toggle Logic ---
    function toggleForms() {
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');
      
      // Clear errors on toggle
      document.querySelectorAll('.input-group').forEach(el => el.classList.remove('input-error'));
      document.querySelectorAll('input').forEach(el => el.value = '');
      document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);

      if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
        setTimeout(() => registerForm.classList.add('hidden'), 50); 
      } else {
        registerForm.classList.remove('hidden');
        setTimeout(() => loginForm.classList.add('hidden'), 50);
      }
    }

    // --- Dynamic Aadhaar Formatting ---
    const aadhaarInput = document.getElementById('reg-aadhaar');
    aadhaarInput.addEventListener('input', function(e) {
      let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
      if (val.length > 12) val = val.slice(0, 12); // Max 12 digits
      
      // Add spaces every 4 digits
      let formatted = val.match(/.{1,4}/g);
      if (formatted) {
        e.target.value = formatted.join(' ');
      } else {
        e.target.value = val;
      }
    });

    // --- Validation Helper Functions ---
    function setError(groupId) {
      document.getElementById(groupId).classList.add('input-error');
    }
    
    function clearError(groupId) {
      document.getElementById(groupId).classList.remove('input-error');
    }

    function simulateBackendCall(btnElement, successMessage) {
  btnElement.classList.add('loading');
  btnElement.innerHTML = '🔄 Processing...';
  
  setTimeout(() => {
    btnElement.classList.remove('loading');
    btnElement.classList.add('success');
    btnElement.innerHTML = `✅ ${successMessage}`;
    
    // Wait 800 milliseconds so the user sees the success message, then redirect!
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800); 
    
  }, 1500);
}

    // --- Login Validation ---
    document.getElementById('form-login').addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      const phone = document.getElementById('login-phone').value;
      const pin = document.getElementById('login-pin').value;

      // Validate Phone (10 digits)
      if (!/^\d{10}$/.test(phone)) {
        setError('group-login-phone');
        isValid = false;
      } else {
        clearError('group-login-phone');
      }

      // Validate PIN (6 digits)
      if (!/^\d{6}$/.test(pin)) {
        setError('group-login-pin');
        isValid = false;
      } else {
        clearError('group-login-pin');
      }

      if (isValid) {
        simulateBackendCall(document.getElementById('btn-login'), 'Login Successful!');
      }
    });

    // --- Registration Validation ---
   // --- Registration Validation ---
    document.getElementById('form-register').addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('reg-name').value.trim();
      const phone = document.getElementById('reg-phone').value;
      const pin = document.getElementById('reg-pin').value;
      const state = document.getElementById('reg-state').value;
      const crop = document.getElementById('reg-crop').value;
      const aadhaar = document.getElementById('reg-aadhaar').value.replace(/\D/g, ''); 

      // Validate Name
      if (name.length < 3) { setError('group-reg-name'); isValid = false; } 
      else { clearError('group-reg-name'); }

      // Validate Phone
      if (!/^\d{10}$/.test(phone)) { setError('group-reg-phone'); isValid = false; } 
      else { clearError('group-reg-phone'); }

      // Validate PIN
      if (!/^\d{6}$/.test(pin)) { setError('group-reg-pin'); isValid = false; } 
      else { clearError('group-reg-pin'); }

      // Validate State
      if (!state) { setError('group-reg-state'); isValid = false; } 
      else { clearError('group-reg-state'); }

      // Validate Crop
      if (!crop) { setError('group-reg-crop'); isValid = false; } 
      else { clearError('group-reg-crop'); }

      // Validate Aadhaar (exactly 12 digits)
      if (aadhaar.length !== 12) { setError('group-reg-aadhaar'); isValid = false; } 
      else { clearError('group-reg-aadhaar'); }

      if (isValid) {
        // --- THIS IS THE NEW PART: Save the name to localStorage ---
        const firstName = name.split(' ')[0]; 
        localStorage.setItem('khadsetu_user_name', firstName);
        
        simulateBackendCall(document.getElementById('btn-register'), 'Account Created!');
      }
    });

    // Remove error class on input
    document.querySelectorAll('input, select').forEach(element => {
      element.addEventListener('input', function() {
        this.parentElement.classList.remove('input-error');
      });
    });