console.log('Before');


// Promise-based approuch
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repositories => getCommits(repositories[0]))
//   .then(commits => console.log(commits))
//   .catch(err => console.error('Error:', err));

  // Awync and Await approuch
  async function displayCommits() {
    try {
      const user = await getUser(1)
      const repositories = await getRepositories(user.gitHubUsername)
      const commits = await getCommits(repositories[0])
      console.log(commits);
    } catch (err) {
        console.log('Error', err.message); 
    }  
  }
  displayCommits()

  console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading a user ${id} from the database`);
      resolve({ id: id, gitHubUsername: 'OR3L1676' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Loading repositories for ${username}`);
    //   resolve(['repo1', 'repo2', 'repo3']);
      reject(new Error('This is a dungerous error'));
    }, 2000);
  });
}

function getCommits(repository) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(['commit']);
    }, 2000);
  });
}
