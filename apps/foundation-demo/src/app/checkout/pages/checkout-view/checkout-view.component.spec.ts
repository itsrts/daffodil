import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutViewComponent } from './checkout-view.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

let stubIsShippingInfoValid = true;

@Component({selector: 'shipping-async-wrapper', template: ''})
class MockShippingAsyncWrapperComponent {
  @Input() isShippingInfoValid: boolean;
  @Output() continueToPayment: EventEmitter<any> = new EventEmitter();
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('on <shipping-async-wrapper>', () => {
    
    it('should set isShippingInfoValid', () => {
      expect(shippingAsyncWrapper.isShippingInfoValid).toEqual(stubIsShippingInfoValid);
    });
  });

  describe('when <shipping-async-wrapper> emits continueToPayment', () => {
    
    it('should call onContinueToPayment', () => {
      spyOn(component, 'onContinueToPayment');

      shippingAsyncWrapper.continueToPayment.emit();

      expect(component.onContinueToPayment).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    
    it('should set showPaymentView to false', () => {
      expect(component.showPaymentView).toBeFalsy();
    });
  });

  describe('onContinueToPayment', () => {
    
    it('should set showPaymentView to true', () => {
      component.onContinueToPayment();

      expect(component.showPaymentView).toBeTruthy();
    });
  });

  describe('when showPaymentView is false', () => {
    
    it('should not render checkout__payment', () => {
      component.showPaymentView = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.checkout__payment'))).toBeNull();
    });
  });

  describe('when showPaymentView is true', () => {
    
    it('should render checkout__payment', () => {
      component.showPaymentView = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.checkout__payment'))).not.toBeNull();
    });
  });
});
