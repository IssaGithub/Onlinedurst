import { PluginCommonModule, VendurePlugin, OrderLineEvent, EventBus, TransactionalConnection } from '@vendure/core';
import { OnApplicationBootstrap } from '@nestjs/common';

@VendurePlugin({
    imports: [PluginCommonModule],
})
export class DepositPlugin implements OnApplicationBootstrap {
    constructor(
        private eventBus: EventBus,
        private connection: TransactionalConnection,
    ) {}

    async onApplicationBootstrap() {
        this.eventBus.ofType(OrderLineEvent).subscribe(async (event) => {
            const { order, orderLine, type } = event;
            
            if (type === 'created' || type === 'updated' || type === 'deleted') {
                await this.calculateTotalDeposit(event.ctx, order);
            }
        });
    }

    private async calculateTotalDeposit(ctx: any, order: any) {
        const orderRepo = this.connection.getRepository(ctx, 'Order');
        
        let totalDeposit = 0;
        
        for (const line of order.lines) {
            const variant = line.productVariant;
            const depositAmount = variant?.customFields?.depositAmount || 0;
            totalDeposit += depositAmount * line.quantity;
        }
        
        await orderRepo.update(order.id, {
            customFields: {
                ...order.customFields,
                totalDeposit,
            },
        });
    }
}
