import {
    CreatePaymentResult,
    CreateRefundResult,
    LanguageCode,
    PaymentMethodHandler,
    SettlePaymentResult,
} from '@vendure/core';

export const invoicePaymentHandler = new PaymentMethodHandler({
    code: 'invoice-payment',
    description: [
        { languageCode: LanguageCode.en, value: 'Invoice Payment (B2B only)' },
        { languageCode: LanguageCode.de, value: 'Zahlung auf Rechnung (nur B2B)' },
    ],
    args: {
        paymentTermDays: {
            type: 'int',
            defaultValue: 14,
            label: [{ languageCode: LanguageCode.de, value: 'Zahlungsziel (Tage)' }],
        },
    },
    createPayment: async (ctx, order, amount, args, metadata): Promise<CreatePaymentResult> => {
        const customer = order.customer;
        const customFields = customer?.customFields as { customerType?: string } | undefined;
        const isB2B = customFields?.customerType === 'b2b';
        
        if (!isB2B) {
            return {
                amount,
                state: 'Declined',
                errorMessage: 'Zahlung auf Rechnung ist nur für Geschäftskunden (B2B) verfügbar.',
            };
        }
        
        return {
            amount,
            state: 'Authorized',
            transactionId: `INV-${order.code}-${Date.now()}`,
            metadata: {
                paymentTermDays: args.paymentTermDays,
                dueDate: new Date(Date.now() + args.paymentTermDays * 24 * 60 * 60 * 1000).toISOString(),
            },
        };
    },
    settlePayment: async (ctx, order, payment, args): Promise<SettlePaymentResult> => {
        return {
            success: true,
            metadata: {
                settledAt: new Date().toISOString(),
            },
        };
    },
    createRefund: async (ctx, input, amount, order, payment, args): Promise<CreateRefundResult> => {
        return {
            state: 'Settled',
            transactionId: `REF-${payment.transactionId}`,
        };
    },
});
