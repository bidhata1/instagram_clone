document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.logo h2');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Profile picture upload functionality
    const profilePicture = document.getElementById('profilePic');
    const profileInput = document.getElementById('profilePicInput');

    profilePicture.addEventListener('click', () => {
        profileInput.click();
    });

    profileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicture.src = e.target.result;
            };
            reader.readAsDataURL(file);
            
            // Upload to server
            uploadImage(file);
        }
    });

    function uploadImage(file) {
        const formData = new FormData();
        formData.append('profilePic', file);

        fetch('/upload', {  // Replace '/upload' with your server endpoint
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert('Profile picture uploaded successfully!');
            } else {
                alert('Error uploading profile picture.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading profile picture.');
        });
    }

    // Post modal functionality
    const modal = document.getElementById('postModal');
    const modalImg = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.getElementsByClassName('close')[0];

    document.querySelectorAll('.post-images img').forEach(img => {
        img.addEventListener('click', (event) => {
            modal.style.display = 'block';
            modalImg.src = event.target.src;
            modalDescription.textContent = event.target.parentNode.dataset.description;
        });
    });

    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});


//script for setting float page
document.addEventListener('DOMContentLoaded', () =>{
    const settingsIcon=document.getElementById('settingsIcon');
    const floatingBox= document.getElementById('floatingBox');
    const closeBtn= document.getElementsByClassName('close-setting')[0];
    
    settingsIcon.addEventListener('click',(e) => {
        e.preventDefault();
        floatingBox.style.display='block';
    });
    closeBtn.addEventListener('click', () => {
        floatingBox.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == floatingBox) {
            floatingBox.style.display = 'none';
        }
    });
});
