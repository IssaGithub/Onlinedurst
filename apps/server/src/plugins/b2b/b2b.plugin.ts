import {
    PluginCommonModule,
    VendurePlugin,
    ProductVariantPriceCalculationStrategy,
    PriceCalculationResult,
    RequestContext,
    ProductVariant,
    Injector,
    CustomerService,
    TransactionalConnection,
} from '@vendure/core';

export class B2BPriceCalculationStrategy implements ProductVariantPriceCalculationStrategy {
    private customerService: CustomerService;
    private connection: TransactionalConnection;

    init(injector: Injector) {
        this.customerService = injector.get(CustomerService);
        this.connection = injector.get(TransactionalConnection);
    }

    async calculate(args: {
        inputPrice: number;
        taxCategory: any;
        activeTaxZone: any;
        ctx: RequestContext;
        productVariant?: ProductVariant;
    }): Promise<PriceCalculationResult> {
        const { inputPrice, ctx } = args;
        
        let discountPercentage = 0;
        
        if (ctx.activeUserId) {
            try {
                const customer = await this.customerService.findOneByUserId(ctx, ctx.activeUserId);
                if (customer) {
                    const customerWithGroups = await this.connection.getRepository(ctx, 'Customer').findOne({
                        where: { id: customer.id },
                        relations: ['groups'],
                    });
                    
                    if (customerWithGroups?.groups) {
                        for (const group of customerWithGroups.groups) {
                            if (group.name === 'B2B-Kunden' || group.name === 'Geschäftskunden') {
                                discountPercentage = 10;
                                break;
                            }
                            if (group.name === 'B2B-Premium' || group.name === 'Großkunden') {
                                discountPercentage = 15;
                                break;
                            }
                        }
                    }
                }
            } catch (e) {
                // Fallback to standard price
            }
        }
        
        const discountedPrice = Math.round(inputPrice * (1 - discountPercentage / 100));
        
        return {
            price: discountedPrice,
            priceIncludesTax: false,
        };
    }
}

@VendurePlugin({
    imports: [PluginCommonModule],
    configuration: config => {
        config.catalogOptions.productVariantPriceCalculationStrategy = new B2BPriceCalculationStrategy();
        return config;
    },
})
export class B2BPlugin {}
