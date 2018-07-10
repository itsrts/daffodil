import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  
  @Input() isShippingInfoValid: boolean;
  @Output() continueToPayment: EventEmitter<any> = new EventEmitter();
  showShippingForm: boolean;

  ngOnInit() {
    this.showShippingForm = !this.isShippingInfoValid;
  }

  toggleShippingView() {
    this.showShippingForm = !this.showShippingForm;
  }

  onContinueToPayment() {
    this.continueToPayment.emit();
  }
}
