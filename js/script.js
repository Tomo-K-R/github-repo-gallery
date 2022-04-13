// This div is where the profile information will appear. 
const overview = document.querySelector(".overview");
const username = "Tomo-K-R";
// The unordered list to display the repos list
const reposList = document.querySelector(".repo-list");
// The section where all your repo information appears. 
const repos = document.querySelector(".repos");
// The section where the individual repo data will appear.
const repoData = document.querySelector(".repo-data");

const getProfile = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    console.log(profile);

    displayProfile(profile);
};

getProfile();

const displayProfile = function(profile){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
        <figure>
        <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div>
    `;
  
  overview.append(userInfo);
  fetchListOfRepos();
};

// A function to fetch the list of repos.
const fetchListOfRepos = async function(){
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated_at&per_page=100`);
    const data = await res.json();
    console.log(data);
    displayRepo(data);
};

// A function to display info about the repo.
const displayRepo = function(repos){
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        const nameOfRepo = document.createElement("h3");
        nameOfRepo.innerHTML = `${repo.name}`;
        li.append(nameOfRepo);
        reposList.append(li);
    };
};

const repoList = document.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    };
});
 
const getRepoInfo = async function(repoName){
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch (`https://api.github.com/repos/Tomo-K-R/github-repo-gallery/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];

    for (const language in languageData) {
        // console.log(language);
        // CSS
        // JavaScript
        // HTML
        languages.push(language);
    };

    console.log(languages);

    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages){
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    // Append the new div element to the section with a class of “repo-data”.
    repoData.append(div);
    // Unhide (show) the “repo-data” element.
    repoData.classList.remove("hide");
    // Hide the element with the class of “repos”.
    reposList.classList.add("hide");
};