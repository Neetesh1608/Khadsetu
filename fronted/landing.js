// 1. Initialize Supabase (Replace with your actual keys)
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Registration Logic & Anti-Black Market Rule
const regForm = document.getElementById('registrationForm');

// We check if the form exists on the page before running the code
if (regForm) {
    regForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Stops the page from refreshing

        // Grab values from the HTML inputs
        const name = document.getElementById('name').value;
        const aadhaar = document.getElementById('aadhaar').value;
        const landSize = parseFloat(document.getElementById('land').value);

        // ANTI-FRAUD RULE: Set limit strictly via code (2 bags per acre)
        const ureaLimit = landSize * 2;

        // Send to SQL Database
        const { data, error } = await _supabase
            .from('farmers')
            .insert([
                { 
                    name: name, 
                    aadhaar_no: aadhaar, 
                    land_size_acres: landSize, 
                    urea_limit_bags: ureaLimit 
                }
            ]);

        // Handle the Result
        if (error) {
            alert("Error saving to database: " + error.message);
        } else {
            alert(`Success! Account created for ${name}. Your Urea limit is ${ureaLimit} bags.`);
            window.location.href = "login.html"; // Send them to login
        }
    });
}

// 3. Visual Effects (Cleaned up duplicates)
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navigation Functions
function goLogin() {
    window.location.href = "login.html";
}

function scrollToRegister() {
    const regSection = document.getElementById('register');
    if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth' });
    }
}