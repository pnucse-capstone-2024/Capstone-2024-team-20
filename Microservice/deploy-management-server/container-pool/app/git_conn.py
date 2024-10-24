import sys
import os
import git

class Git:

    def __init__(self, token, path):
        self.token = token
        self.save_dir = path

    def make_safe_dir(self, dir):
        if not os.path.exists(dir):
            os.makedirs(dir)

    def git_clone(self, git_url):
        self.make_safe_dir(self.save_dir)

        dir = git_url.split('/')[-1].split('.')[0]
        
        repo_dir = self.save_dir + '/' + dir
        self.make_safe_dir(repo_dir)

        
        access_url = "https://" + self.token + "@" + git_url.split("//")[1]
        try:
            git.Repo.clone_from(access_url, repo_dir)
            return dir
        except:
            try:
                git.Repo(repo_dir).remote("origin").pull()
                return dir
            except:
                return None
                
        