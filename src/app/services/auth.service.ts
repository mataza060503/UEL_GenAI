import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { DataService } from './Data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private auth: Auth, private dataService: DataService) {
    this.user$ = authState(this.auth); // Track auth state
  }

  // 🔹 Google Login
  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('User signed in:', result.user);
      return result.user;
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error;
    }
  }

  // 🔹 Logout
  async signOut() {
    try {
      await signOut(this.auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  }

  // 🔹 Get User Observable
  getUser(): Observable<any> {
    return this.user$;
  }

}
