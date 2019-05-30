import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitServices {

  constructor(private http: HttpClient) { }

  getUserRepos(name) {
    return this.http.get(`https://api.github.com/users/${name}/repos?per_page=100`);
  }

  getRepoCommitCount(owner, repo) {
    return this.http.get(`https://api.github.com/repos/${owner}/${repo}/stats/participation`);
  }
}
