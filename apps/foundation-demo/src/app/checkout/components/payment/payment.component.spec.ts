import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentInfo, PaymentFactory, PaymentContainer } from '@daffodil/core';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { PaymentSummaryComponent } from '../payment-summary/payment-summary.component';

let paymentFactory = new PaymentFactory();
let stubPaymentInfo = paymentFactory.create();

@Component({selector: 'payment-form', template: ''})
class MockPaymentFormComponent {
  @Input() paymentInfo: PaymentInfo;
  @Output() updatePaymentInfo: EventEmitter<any> = new EventEmitter();
}

@Component({selector: 'payment-summary', template: ''})
class MockPaymentSummaryComponent {
  @Input() paymentInfo: PaymentInfo;
  @Output() updatePaymentInfo: EventEmitter<any> = new EventEmitter();
}

@Component({selector: '[payment-container]', template: '<ng-content></ng-content>', exportAs: 'PaymentContainer'})
class MockPaymentContainer {
  paymentInfo$: Observable<PaymentInfo> = of(stubPaymentInfo);
  updatePaymentInfo: Function = () => {};
}

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let paymentForm: PaymentFormComponent;
  let paymentSummary: PaymentSummaryComponent;
  let paymentContainer: PaymentContainer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PaymentComponent,
        MockPaymentContainer,
        MockPaymentFormComponent,
        MockPaymentSummaryComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    paymentForm = fixture.debugElement.query(By.css('payment-form')).componentInstance;
    paymentSummary = fixture.debugElement.query(By.css('payment-summary')).componentInstance;
    paymentContainer = fixture.debugElement.query(By.css('[payment-container]')).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on <payment-form>', () => {
    
    it('should set paymentInfo', () => {
      expect(paymentForm.paymentInfo).toEqual(stubPaymentInfo);
    });
  });

  describe('when paymentForm.updatePaymentInfo is emitted', () => {

    it('should call PaymentContainer.updatePaymentInfo', () => {
      spyOn(paymentContainer, 'updatePaymentInfo');
      paymentForm.updatePaymentInfo.emit(stubPaymentInfo);

      expect(paymentContainer.updatePaymentInfo).toHaveBeenCalledWith(stubPaymentInfo);
    });
  });

  it('should render <payment-summary>', () => {
    expect(paymentSummary).not.toBeNull();
  });
});
