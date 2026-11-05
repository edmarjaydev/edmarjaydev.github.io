document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiry-form');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Replace with your actual Google Apps Script Web App URL after deployment
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxsohH8QuLVrqd9gUPTZ3p8faLTRkfbYTHEPp5WZJUNhpoCo_8zOka67b6rVjWt9fKjdQ/exec';

      // Collect form data matching your input names
      const formData = {
        name: form.querySelector('[name="name"]').value,
        business_name: form.querySelector('[name="business_name"]').value,
        email: form.querySelector('[name="email"]').value,
        website: form.querySelector('[name="website"]').value,
        business_type: form.querySelector('[name="business_type"]').value,
        budget: form.querySelector('[name="budget"]').value,
        requirements: form.querySelector('[name="requirements"]').value,
        project_details: form.querySelector('[name="project_details"]').value
      };

      // Optional: Update button text or show loading state
      const submitBtn = form.querySelector('.form-submit');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Enquiry...';
      formStatus.textContent = 'Submitting your project details...';

      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        formStatus.textContent = 'Thank you! Your project enquiry has been sent successfully.';
        formStatus.style.color = '#10b981'; // Success green
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      })
      .catch(error => {
        console.error('Submission Error:', error);
        formStatus.textContent = 'There was an error submitting your form. Please try again.';
        formStatus.style.color = '#ef4444'; // Error red
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    });
  }
});
