import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alert } from './shared/components/alert/alert';
import { AlertDialog } from './shared/components/alert-dialog/alert-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Alert, AlertDialog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
