const documentForm = document.getElementById('documentForm');
const documentSearchInput = document.getElementById('documentSearch');
const documentDisplay = document.getElementById('documentDisplay');

documentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = documentSearchInput.value;
    // Send a request to your Node.js server to fetch the document based on searchTerm.
    try {
        const response = await axios.post(`http://localhost:3001/api/documents?file=${searchTerm}`);
        if (response.ok) {
            const data = await response.json();
            documentDisplay.innerHTML = data.content;
        } else {
            console.error('Error fetching document');
        }
    } catch (error) {
        console.error(error);
    }
});
