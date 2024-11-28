
const emailsPerPage = 5;
let currentPage = 1;
let emails = [];

async function fetchEmails() {
    try {
        const response = await fetch('/sent-emails');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        emails = await response.json();
        renderEmails();
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
}

function renderEmails() {
    const emailListBody = document.getElementById('email-list-body');
    const checkAll = document.getElementById('select-all')
    const allCheckboxes = document.getElementsByClassName('email-checkbox')
    checkAll.addEventListener("change", () => {
        for (let checkbox of allCheckboxes) {
            checkbox.checked = checkAll.checked
        }
    })
    emailListBody.innerHTML = '';
    const start = (currentPage - 1) * emailsPerPage;
    const end = start + emailsPerPage;
    const currentEmails = emails.slice(start, end);


    for (let i = 0; i < currentEmails.length; i++) {
        const email = currentEmails[i];
        const emailItem = document.createElement('tr');
        emailItem.classList.add('email-item');
        emailItem.innerHTML = `
                    <td class="checkbox"><input type="checkbox" class="email-checkbox" data-id="${email.id}"></td>
                    <td class="sender">${email.receiver_email}</td>
                    <td class="subject"> 
                        <a style="text-decoration: none;" href="/email/${email.id}">
                                ${email.subject ? email.subject : 'No subject'}
                        </a>
                    </td>
                    <td class="date">${new Date(email.sent_at).toLocaleString()}</td>
                `;
        emailListBody.appendChild(emailItem);
    }

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(emails.length / emailsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.onclick = () => {
            currentPage = i;
            renderEmails();
        };
        pagination.appendChild(pageLink);
    }
}


fetchEmails();

function navigateTo(page) {
    window.location.href = `/${page}`
}
function deleteSelectedEmails() {
    const selectedCheckboxes = document.querySelectorAll('.email-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.id));

    if (selectedIds.length === 0) {
        alert('Please select at least one email to delete.');
        return;
    }

    fetch('/delete-emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: selectedIds, fromSender: true })
    })
        .then(response => {
            if (response.ok) {

                for (const id of selectedIds) {
                    const index = emails.findIndex(email => email.id === id);
                    if (index !== -1) {
                        emails.splice(index, 1);
                    }
                }
                alert('Emails deleted successfully.');
                fetchEmails();
            } else {
                return response.json().then(err => {
                    alert(`Failed to delete emails: ${selectedIds}`);
                });
            }
        })
        .catch(error => {
            alert('An error occurred while deleting emails: ' + error.message);
        });
}

