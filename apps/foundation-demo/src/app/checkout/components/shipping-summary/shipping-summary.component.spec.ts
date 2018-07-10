import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingSummaryComponent } from './shipping-summary.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShippingAddress } from '@daffodil/core';
import { By } from '@angular/platform-browser';
import { ShippingOptionComponent } from '../shipping-option/shipping-option.component';

let stubShippingAddress = {
  firstname: 'firstname',
  lastname: 'lastname',
  street: 'street',
  city: 'city',
  state: 'state',
  postcode: 'postcode',
  telephone: 'telephone'
};
let stubShippingOption = 'shipping option';

@Component({selector: 'shipping-option', template: ''})
class MockShippingOptionComponent {
  @Input() shippingOption: string;
  @Output() updateShippingOption: EventEmitter<any> = new EventEmitter();
}

@Component({template: '<shipping-summary [shippingInfo]="shippingInfoValue" (editShippingInfo)="editShippingInfoFunction()" [shippingOption]="shippingOptionValue" (updateShippingOption)="updateShippingOptionFunction($event)" (continueToPayment)="continueToPaymentFunction()"></shipping-summary>'})
class TestShippingSummaryWrapper {
  shippingInfoValue: ShippingAddress = stubShippingAddress;
  shippingOptionValue: string = stubShippingOption;
  editShippingInfoFunction: Function = () => {};
  updateShippingOptionFunction: Function = () => {};
  continueToPaymentFunction: Function = () => {};
}

describe('ShippingSummaryComponent', () => {
  let component: TestShippingSummaryWrapper;
  let fixture: ComponentFixture<TestShippingSummaryWrapper>;
  let shippingSummaryComponent: ShippingSummaryComponent;
  let shippingOptionComponent: ShippingOptionComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MockShippingOptionComponent,
        TestShippingSummaryWrapper,
        ShippingSummaryComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShippingSummaryWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();

    shippingSummaryComponent = fixture.debugElement.query(By.css('shipping-summary')).componentInstance;
    shippingOptionComponent = fixture.debugElement.query(By.css('shipping-option')).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to take shippingInfo', () => {
    expect(shippingSummaryComponent.shippingInfo).toEqual(stubShippingAddress);
  });

  it('should be able to take shippingOption', () => {
    expect(shippingSummaryComponent.shippingOption).toEqual(stubShippingOption);
  });

  describe('on <shipping-option>', () => {
    
    it('should set shippingOption', () => {
      expect(shippingOptionComponent.shippingOption).toEqual(stubShippingOption);
    });
  });

  describe('ngOnInit', () => {
    
    it('should set showContinueToPayment to true', () => {
      expect(shippingSummaryComponent.showContinueToPayment).toBeTruthy();
    });
  });

  describe('when shippingOption.updateShippingOption is emitted', () => {
    
    it('should call onUpdateShippingOption', () => {
      spyOn(shippingSummaryComponent, 'onUpdateShippingOption');

      shippingOptionComponent.updateShippingOption.emit(stubShippingOption);

      expect(shippingSummaryComponent.onUpdateShippingOption).toHaveBeenCalledWith(stubShippingOption);
    });
  });

  describe('when edit anchor tag is clicked', () => {
    
    it('should call onEdit', () => {
      spyOn(shippingSummaryComponent, 'onEdit');

      fixture.debugElement.query(By.css('a')).nativeElement.click();

      expect(shippingSummaryComponent.onEdit).toHaveBeenCalled();
    });
  });

  describe('onEdit', () => {
    
    it('should call editShippingInfo.emit', () => {
      spyOn(shippingSummaryComponent.editShippingInfo, 'emit');

      shippingSummaryComponent.onEdit();

      expect(shippingSummaryComponent.editShippingInfo.emit).toHaveBeenCalled();
    });
  });

  describe('when editShippingInfo is emitted', () => {

    it('should call editShippingInfoFunction', () => {
      spyOn(component, 'editShippingInfoFunction');

      shippingSummaryComponent.editShippingInfo.emit();

      expect(component.editShippingInfoFunction).toHaveBeenCalled();
    });
  });

  describe('onUpdateShippingOption', () => {
    
    it('should call updateShippingOption.emit', () => {
      spyOn(shippingSummaryComponent.updateShippingOption, 'emit');

      shippingSummaryComponent.onUpdateShippingOption(stubShippingOption);

      expect(shippingSummaryComponent.updateShippingOption.emit).toHaveBeenCalledWith(stubShippingOption);
    });
  });

  describe('when updateShippingOption is emitted', () => {

    it('should call updateShippingOptionFunction', () => {
      spyOn(component, 'updateShippingOptionFunction');

      shippingSummaryComponent.updateShippingOption.emit(stubShippingOption);

      expect(component.updateShippingOptionFunction).toHaveBeenCalledWith(stubShippingOption);
    });
  });

  describe('when continue to payment button is clicked', () => {
    
    it('should call onContinueToPayment', () => {
      spyOn(shippingSummaryComponent, 'onContinueToPayment');

      fixture.debugElement.query(By.css('button')).nativeElement.click();

      expect(shippingSummaryComponent.onContinueToPayment).toHaveBeenCalled();
    });
  });

  describe('onContinueToPayment', () => {

    beforeEach(() => {
      spyOn(shippingSummaryComponent.continueToPayment, 'emit');

      shippingSummaryComponent.onContinueToPayment();
    });

    it('should set showContinueToPayment to false', () => {
      expect(shippingSummaryComponent.showContinueToPayment).toBeFalsy();
    });
    
    it('should call continueToPayment.emit', () => {
      expect(shippingSummaryComponent.continueToPayment.emit).toHaveBeenCalled();
    });
  });

  describe('when continueToPayment is emitted', () => {
    
    it('should call function passed by host component', () => {
      spyOn(component, "continueToPaymentFunction");

      shippingSummaryComponent.continueToPayment.emit();

      expect(component.continueToPaymentFunction).toHaveBeenCalled();
    });
  });

  describe('when showContinueToPayment is true', () => {
    
    beforeEach(() => {
      shippingSummaryComponent.showContinueToPayment = true;
    
      fixture.detectChanges();
    });

    it('should render the Continue to Payment button', () => {
      expect(fixture.debugElement.query(By.css('button'))).not.toBeNull();
    });
  });

  describe('when showContinueToPayment is false', () => {
    
    beforeEach(() => {
      shippingSummaryComponent.showContinueToPayment = false;

      fixture.detectChanges();
    });

    it('should not render the Continue to Payment button', () => {
      expect(fixture.debugElement.query(By.css('button'))).toBeNull();      
    });
  });
});
