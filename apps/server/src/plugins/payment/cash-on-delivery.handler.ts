import {
    CreatePaymentResult,
    CreateRefundResult,
    LanguageCode,
    PaymentMethodHandler,
    SettlePaymentResult,
} from '@vendure/core';

export const cashOnDeliveryHandler = new PaymentMethodHandler({
    code: 'cash-on-delivery',
    description: [
        { languageCode: LanguageCode.en, value: 'Cash on Delivery' },
        { languageCode: LanguageCode.de, value: 'Barzahlung bei Lieferung' },
    ],
    args: {},
    createPayment: async (ctx, order, amount, args, metadata): Promise<CreatePaymentResult> => {
        return {
            amount,
            state: 'Authorized',
            transactionId: `COD-${order.code}-${Date.now()}`,
            metadata: {
                note: 'Zahlung erfolgt bei Lieferung',
            },
        };
    },
    settlePayment: async (ctx, order, payment, args): Promise<SettlePaymentResult> => {
        return {
            success: true,
            metadata: {
                paidAt: new Date().toISOString(),
                paidBy: 'cash',
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
