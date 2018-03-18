import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
  public title: String;
  public message: String = 'Default message';
  public confirmText: String;
  public declineText: String;
  public onDecline = new EventEmitter();
  public onConfirm = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit() {
  }

  onConfirmClicked() {
    this.onConfirm.emit();
    this.dialogRef.close();
  }

  onDeclaneClicked() {
    this.onDecline.emit();
    this.dialogRef.close();
  }
}
