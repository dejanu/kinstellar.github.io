document.addEventListener("DOMContentLoaded", function() {
    const patForm = document.getElementById('pat-form');
    patForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const token = document.getElementById('pat-token').value;
        const locations = ['Austria', 'Belgium', 'Bulgaria', 'Denmark', 'France', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Romania', 'Switzerland'];
    
        locations.forEach(location => {
            fetchGitHubUsersByLocation(location, token);
        });
    });

    function fetchGitHubUsersByLocation(location, token) {
        const url = `https://api.github.com/search/users?q=location:${location}`;
        const headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Authorization": `token ${token}`
        };

        fetch(url, { headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`GitHub API request failed with status code ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`Number of users found in ${location}: `, data.total_count);
                // Process the data as needed
            })
            .catch(error => {
                console.error('Error fetching GitHub users:', error);
            });
    }
});
