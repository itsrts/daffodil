import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutViewComponent } from './pages/checkout-view/checkout-view.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCheckoutModule } from '@daffodil/core';
import { ShippingSummaryComponent } from './components/shipping-summary/shipping-summary.component';
import { ShippingOptionComponent } from './components/shipping-option/shipping-option.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ShippingAsyncWrapperComponent } from './components/shipping-async-wrapper/shipping-async-wrapper.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { CartModule } from '../cart/cart.module';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCheckoutModule,
    CartModule
  ],
  declarations: [
    CheckoutViewComponent,
    ShippingFormComponent,
    ShippingSummaryComponent,
    ShippingOptionComponent,
    ShippingComponent,
    ShippingAsyncWrapperComponent,
    PaymentFormComponent,
    PaymentComponent,
    PaymentSummaryComponent
  ],
  exports: [
    CheckoutViewComponent,
    ShippingFormComponent,
    ShippingSummaryComponent,
    ShippingOptionComponent,
    ShippingComponent,
    ShippingAsyncWrapperComponent,
    PaymentFormComponent,
    PaymentComponent,
    PaymentSummaryComponent
  ]
})
export class CheckoutModule { }
