import { async, TestBed } from '@angular/core/testing';
import { ShopifyDriverModule } from './shopify-driver.module';

describe('ShopifyDriverModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ShopifyDriverModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ShopifyDriverModule).toBeDefined();
  });
});
