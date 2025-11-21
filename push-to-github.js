import { exec } from 'child_process';
import { promisify } from 'util';
import { Octokit } from '@octokit/rest';

const execAsync = promisify(exec);

async function getGitHubToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken || !hostname) {
    throw new Error('GitHub connection not available');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );
  
  const data = await response.json();
  const connectionSettings = data.items?.[0];
  const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
  
  if (!accessToken) {
    throw new Error('Failed to get GitHub access token');
  }
  
  return accessToken;
}

async function pushToGitHub() {
  try {
    const token = await getGitHubToken();
    const octokit = new Octokit({ auth: token });
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    const username = user.login;
    
    console.log(`📝 Authenticated as: ${username}`);
    
    // Create repository
    const repoName = 'pure-harvest';
    console.log(`🔧 Creating repository: ${repoName}...`);
    
    let repo;
    try {
      const { data: existingRepo } = await octokit.repos.get({
        owner: username,
        repo: repoName
      });
      repo = existingRepo;
      console.log(`✅ Repository already exists`);
    } catch (error) {
      if (error.status === 404) {
        const { data: newRepo } = await octokit.repos.create({
          name: repoName,
          description: 'Pure Harvest - Premium Dairy & Condiments E-Commerce Platform',
          private: false
        });
        repo = newRepo;
        console.log(`✅ Repository created successfully`);
      } else {
        throw error;
      }
    }
    
    // Initialize git
    console.log('🚀 Initializing git repository...');
    
    try {
      await execAsync('git status');
      console.log('✅ Git already initialized');
    } catch {
      await execAsync('git init');
      console.log('✅ Git initialized');
    }
    
    // Configure git
    await execAsync('git config user.name "Pure Harvest Bot"');
    await execAsync('git config user.email "bot@pureharvest.app"');
    
    // Add all files
    console.log('📦 Staging files...');
    await execAsync('git add .');
    
    // Commit
    console.log('💾 Creating commit...');
    try {
      await execAsync('git commit -m "Initial commit: Pure Harvest E-Commerce Platform"');
      console.log('✅ Committed');
    } catch {
      console.log('✅ No changes to commit');
    }
    
    // Set remote and push
    const remoteUrl = `https://${token}@github.com/${username}/${repoName}.git`;
    console.log('🔗 Setting up remote...');
    
    try {
      await execAsync('git remote remove origin');
    } catch {
      // Remote doesn't exist yet
    }
    
    await execAsync(`git remote add origin ${remoteUrl}`);
    
    // Push
    console.log('📤 Pushing to GitHub...');
    await execAsync('git branch -M main');
    await execAsync('git push -u origin main', { maxBuffer: 50 * 1024 * 1024 });
    
    console.log('\n✨ SUCCESS! Your code is now on GitHub!');
    console.log(`\n📍 Repository URL: https://github.com/${username}/${repoName}`);
    console.log(`🌐 Clone command: git clone https://github.com/${username}/${repoName}.git`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

pushToGitHub();
