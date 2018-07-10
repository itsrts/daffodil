import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutViewComponent } from './checkout-view.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { PaymentFactory, PaymentInfo, PaymentContainer } from '@daffodil/core';

let stubIsShippingInfoValid = true;
let paymentFactory = new PaymentFactory();
let stubPaymentInfo = paymentFactory.create();

@Component({selector: 'shipping-async-wrapper', template: ''})
class MockShippingAsyncWrapperComponent {
  @Input() isShippingInfoValid: boolean;
}

@Component({selector: 'payment-form', template: ''})
class MockPaymentFormComponent {
  @Input() paymentInfo: PaymentInfo;
  @Output() updatePaymentInfo: EventEmitter<any> = new EventEmitter();
}

@Component({selector: '[shipping-container]', template: '<ng-content></ng-content>', exportAs: 'ShippingContainer'})
class MockShippingContainer {
  isShippingInfoValid$: Observable<boolean> = of(stubIsShippingInfoValid);
}

@Component({selector: '[payment-container]', template: '<ng-content></ng-content>', exportAs: 'PaymentContainer'})
class MockPaymentContainer {
  paymentInfo$: Observable<PaymentInfo> = of(stubPaymentInfo);
  updatePaymentInfo: Function = () => {};
}

describe('CheckoutViewComponent', () => {
  let component: CheckoutViewComponent;
  let fixture: ComponentFixture<CheckoutViewComponent>;
  let shippingAsyncWrapper: MockShippingAsyncWrapperComponent;
  let paymentForm: PaymentFormComponent;
  let paymentContainer: PaymentContainer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckoutViewComponent,
        MockShippingAsyncWrapperComponent,
        MockShippingContainer,
        MockPaymentFormComponent,
        MockPaymentContainer
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    shippingAsyncWrapper = fixture.debugElement.query(By.css('shipping-async-wrapper')).componentInstance;
    paymentForm = fixture.debugElement.query(By.css('payment-form')).componentInstance;
    paymentContainer = fixture.debugElement.query(By.css('[payment-container]')).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('on <shipping-async-wrapper>', () => {
    
    it('should set isShippingInfoValid', () => {
      expect(shippingAsyncWrapper.isShippingInfoValid).toEqual(stubIsShippingInfoValid);
    });
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
});
