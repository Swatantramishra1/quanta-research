function generatePrefixedCustomId() {
  const randomId = Math.random().toString(36).substr(2, 9); // Generate a random ID
  const prefix = "QUANTA_"; // Your desired prefix
  return prefix + randomId;
}

function registration(formData, event) {
  const SUPABASE_URL = "https://uargtmtggaooieyzzzax.supabase.co"; // Replace with your Supabase Project URL
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcmd0bXRnZ2Fvb2lleXp6emF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNDU3NzIsImV4cCI6MjA0NDgyMTc3Mn0.Cz4s9Pfy0UrnjwyKumi-5SJ7ObC5Z-D7-gE6ztzTOhY"; // Replace with your Supabase anon key
  const supabaseInfo = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  supabaseInfo
    .from("registration") // Replace 'registration' with your actual table name
    .insert([formData])
    .then((response) => {
      if (response.error) {
        console.error("Error inserting data:", response.error);
        if (response.error.code === "23505") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email already exists, Please use a different email to register',
            showConfirmButton: false,
            timer: 3000
          });
        }
      } else {
        Swal.fire({
            icon: 'success',
            title: 'Registration successful!!',
            text: `Please note down your ID: ${formData.custome_info_id}, share with quanta research team`,
            // showConfirmButton: false,
            // timer: 10000
          });
        const modal = document.querySelector("#registrationModal"); // Replace with your modal's ID
        if (modal) {
          modal.style.display = "none"; 
        }

        // Clear the input fields
        event.target.reset();
      }
    });
}

function handleRegistration(event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const name = event.target.querySelector('input[placeholder="Name"]').value;
  const email = event.target.querySelector('input[placeholder="Email"]').value;
  const phone = event.target.querySelector(
    'input[placeholder="Phone Number"]'
  ).value;
  const dob = event.target.querySelector(
    'input[placeholder="Date of Birth"]'
  ).value;
  const customId = generatePrefixedCustomId();

  registration(
    { name, email, phone_number: phone, dob, custome_info_id: customId },
    event
  );
}
