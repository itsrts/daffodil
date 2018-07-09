import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutViewComponent } from './checkout-view.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';

let stubIsShippingInfoValid = true;

@Component({selector: 'shipping-async-wrapper', template: ''})
class MockShippingAsyncWrapperComponent {
  @Input() isShippingInfoValid: boolean;
}

@Component({selector: 'payment-form', template: ''})
class MockPaymentFormComponent {}

@Component({selector: '[shipping-container]', template: '<ng-content></ng-content>', exportAs: 'ShippingContainer'})
class MockShippingContainer {
  isShippingInfoValid$: Observable<boolean> = of(stubIsShippingInfoValid);
}

describe('CheckoutViewComponent', () => {
  let component: CheckoutViewComponent;
  let fixture: ComponentFixture<CheckoutViewComponent>;
  let shippingAsyncWrapper: MockShippingAsyncWrapperComponent;
  let paymentForm: PaymentFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckoutViewComponent,
        MockShippingAsyncWrapperComponent,
        MockShippingContainer,
        MockPaymentFormComponent
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <payment-form>', () => {
    expect(paymentForm).not.toBeNull();
  });
  
  describe('on <shipping-async-wrapper>', () => {
    
    it('should set isShippingInfoValid', () => {
      expect(shippingAsyncWrapper.isShippingInfoValid).toEqual(stubIsShippingInfoValid);
    });
  });
});
