import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ShippingAddress } from '@daffodil/core';

@Component({
  selector: 'shipping-summary',
  templateUrl: './shipping-summary.component.html',
  styleUrls: ['./shipping-summary.component.scss']
})
export class ShippingSummaryComponent implements OnInit {

  @Input() shippingInfo: ShippingAddress;
  @Input() shippingOption: string;
  @Output() editShippingInfo: EventEmitter<any> = new EventEmitter();
  @Output() updateShippingOption: EventEmitter<any> = new EventEmitter();
  @Output() continueToPayment: EventEmitter<any> = new EventEmitter();

  showContinueToPayment: boolean;

  ngOnInit() {
    this.showContinueToPayment = true;
  }

  onEdit() {
    this.editShippingInfo.emit();
  }

  onUpdateShippingOption(option: string) {
    this.updateShippingOption.emit(option);
  }

  onContinueToPayment() {
    this.showContinueToPayment = false;
    this.continueToPayment.emit();
  }
}
