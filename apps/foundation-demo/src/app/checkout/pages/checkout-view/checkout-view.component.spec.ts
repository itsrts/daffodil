import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutViewComponent } from './checkout-view.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

let stubIsShippingInfoValid = true;

@Component({selector: 'shipping-async-wrapper', template: ''})
class MockShippingAsyncWrapperComponent {
  @Input() isShippingInfoValid: boolean;
}

@Component({selector: '[shipping-container]', template: '<ng-content></ng-content>', exportAs: 'ShippingContainer'})
class MockShippingContainer {
  isShippingInfoValid$: Observable<boolean> = of(stubIsShippingInfoValid);
}

@Component({selector: 'payment', template: ''})
class MockPaymentComponent {}

describe('CheckoutViewComponent', () => {
  let component: CheckoutViewComponent;
  let fixture: ComponentFixture<CheckoutViewComponent>;
  let shippingAsyncWrapper: MockShippingAsyncWrapperComponent;
  let payment: MockPaymentComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckoutViewComponent,
        MockShippingAsyncWrapperComponent,
        MockShippingContainer,
        MockPaymentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    shippingAsyncWrapper = fixture.debugElement.query(By.css('shipping-async-wrapper')).componentInstance;
    payment = fixture.debugElement.query(By.css('payment')).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('on <shipping-async-wrapper>', () => {
    
    it('should set isShippingInfoValid', () => {
      expect(shippingAsyncWrapper.isShippingInfoValid).toEqual(stubIsShippingInfoValid);
    });
  });

  it('should render <payment>', () => {
    expect(payment).not.toBeNull();
  });
});
