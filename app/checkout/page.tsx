'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SmartImage } from '@/components/SmartImage';
import { CopyField } from '@/components/CopyField';
import { SHOP } from '@/src/config/site';
import { useCartStorage } from '@/lib/useCartStorage';
import { computeCartTotals, bundleItemPrice, bundleEligible } from '@/lib/cart';
import { waOrderLink } from '@/lib/whatsapp';
import { AU_STATES, isCustomerComplete, generateOrderNumber, type OrderCustomer, type OrderSummary } from '@/lib/order';

export default function CheckoutPage() {
  const { items, isHydrated, updateQuantity, removeItem, saveCart } = useCartStorage();

  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'payid' | 'bank'>('crypto');
  const [payInFour, setPayInFour] = useState(false);
  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    state: 'NSW',
    postcode: '',
  });
  const [orderStatus, setOrderStatus] = useState<'idle' | 'sending'>('idle');
  const [orderError, setOrderError] = useState('');
  // Generated client-side only, after mount — generateOrderNumber() uses
  // Math.random()/Date(), so calling it during the initial render (even in a
  // useState lazy initializer) produces a different value on the server than
  // on the client's hydration pass, which is a hydration mismatch. The whole
  // page is withheld until isHydrated anyway (see below), so this is settled
  // before anyone can see or submit the form.
  const [orderNumber, setOrderNumber] = useState('');
  useEffect(() => {
    setOrderNumber(generateOrderNumber());
  }, []);

  const customerValid = isCustomerComplete(customer);
  const updateCustomer =
    (field: keyof OrderCustomer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setCustomer((c) => ({ ...c, [field]: e.target.value }));

  const totals = computeCartTotals({
    items,
    paymentMethod,
    payInFour,
    cryptoDiscountRate: SHOP.cryptoDiscount || 10,
    freeShippingThreshold: SHOP.freeShippingThreshold,
    shippingFee: SHOP.shippingFee,
    bikeCrateFreight: SHOP.bikeCrateFreight,
  });
  const {
    hasBike, subtotal, bundleSavings, cryptoSavings, shippingCost, grandTotal, gstOnTotal,
    isPayIn4, payIn4Instalment, displayedSubtotal, displayedShipping, displayedTotal, gstOnDisplayedTotal, paymentLabel,
  } = totals;

  const buildOrderSummary = (): OrderSummary => ({
    items,
    subtotal,
    bundleSavings,
    cryptoSavings,
    shippingCost,
    shippingIsFree: shippingCost === 0,
    grandTotal,
    gstPortion: gstOnTotal,
    paymentLabel,
    payIn4: isPayIn4 ? { instalment: payIn4Instalment, dueToday: displayedTotal } : null,
    orderNumber,
  });

  const buildWhatsAppOrderUrl = () => waOrderLink(buildOrderSummary(), customer);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!customerValid) {
      e.preventDefault();
      setOrderError('Please complete your delivery details first.');
      return;
    }
    setOrderError('');
    // Fire-and-forget: record the order the same way Email checkout does —
    // so it shows in /admin/orders/, the business gets the "Send Payment
    // Details" notification, and the customer still gets the confirmation
    // email — regardless of which checkout button they used. Doesn't block
    // or await anything: the anchor's own href/target handle opening
    // WhatsApp natively, so this just runs alongside it.
    fetch('/api/order/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, order: buildOrderSummary(), channel: 'whatsapp' }),
    }).catch((err) => console.error('WhatsApp checkout: order save failed (WhatsApp still opened):', err));
    saveCart([]);
  };

  const handleEmailOrder = async () => {
    if (!customerValid) {
      setOrderError('Please complete your delivery details first.');
      return;
    }
    setOrderStatus('sending');
    setOrderError('');
    try {
      const res = await fetch('/api/order/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, order: buildOrderSummary(), channel: 'email' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        saveCart([]);
        window.location.href = `/thank-you-order/?ref=${encodeURIComponent(orderNumber)}`;
      } else {
        throw new Error(data?.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Order email error:', err);
      setOrderError('Unable to email your order automatically. Please use Checkout via WhatsApp instead.');
      setOrderStatus('idle');
    }
  };

  // Render nothing conditional on cart contents or the order number until
  // the client has settled both (see lib/useCartStorage.ts) — avoids a
  // hydration mismatch.
  if (!isHydrated || !orderNumber) {
    return <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14" aria-hidden="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">Your cart is empty</h1>
        <p className="text-sm text-stone-400">Add an electric dirt bike, battery or riding gear to get started.</p>
        <Link href="/shop/" className="inline-block bg-[#8C4A2F] hover:bg-[#A35839] text-white text-xs font-bold py-3 px-6 rounded-xl transition">
          Browse the Shop &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <nav aria-label="Breadcrumb" className="text-xs text-stone-400 font-mono flex items-center gap-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-[#C87D55]">Checkout</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">Checkout</h1>

      {/* Order items */}
      <div className="bg-[#17191C] border border-[#2B2F36] rounded-2xl divide-y divide-[#2B2F36]">
        {items.map((item) => (
          <div key={item.slug} className="flex gap-3 p-4">
            <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#121417]">
              <SmartImage src={item.image} alt={item.name} fill fit="cover" sizes="64px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-100 truncate">{item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                {bundleEligible(item, hasBike) ? (
                  <>
                    <span className="text-xs text-stone-500 line-through">${item.price.toLocaleString()}</span>
                    <span className="text-xs text-amber-400 font-mono font-bold">
                      ${bundleItemPrice(item, hasBike).toLocaleString()} AUD
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded px-1 py-0.5 uppercase">
                      Bundle −5%
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-amber-400 font-mono font-bold">${item.price.toLocaleString()} AUD</span>
                )}
                {item.discountTag && (
                  <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded px-1 py-0.5 uppercase">
                    New Owner −15%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center border border-[#2B2F36] rounded-lg bg-[#141619]">
                  <button type="button" onClick={() => updateQuantity(item.slug, -1)} className="px-2.5 py-1 text-xs text-stone-400 hover:text-white" aria-label={`Decrease quantity of ${item.name}`}>-</button>
                  <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.slug, 1)} className="px-2.5 py-1 text-xs text-stone-400 hover:text-white" aria-label={`Increase quantity of ${item.name}`}>+</button>
                </div>
                <button type="button" onClick={() => removeItem(item.slug)} className="text-xs text-stone-400 hover:text-rose-400 ml-auto transition font-mono" aria-label={`Remove ${item.name} from cart`}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bundleSavings > 0 && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-2">
          <span className="text-emerald-400 text-sm leading-none mt-0.5">✓</span>
          <p className="text-[11px] text-emerald-200 leading-tight">
            <strong className="font-bold">Bundle discount applied.</strong> You save <strong>${bundleSavings.toLocaleString()} AUD</strong> on parts &amp; gear bought with a bike.
          </p>
        </div>
      )}

      {/* Payment selector */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono font-semibold text-stone-400 uppercase tracking-wider">Select Payment Method</label>
          <span className="text-[11px] font-mono text-amber-300 font-bold">⚡ 10% Off via Crypto</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button type="button" onClick={() => setPaymentMethod('crypto')} className={`py-2 px-1 text-[11px] font-mono font-medium rounded-lg border text-center transition ${paymentMethod === 'crypto' ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold ring-1 ring-amber-500/50' : 'border-[#2B2F36] bg-[#1D2024] text-stone-400 hover:border-stone-600'}`}>Crypto (-10%)</button>
          <button type="button" onClick={() => setPaymentMethod('payid')} className={`py-2 px-1 text-[11px] font-mono font-medium rounded-lg border text-center transition ${paymentMethod === 'payid' ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold ring-1 ring-amber-500/50' : 'border-[#2B2F36] bg-[#1D2024] text-stone-400 hover:border-stone-600'}`}>PayID</button>
          <button type="button" onClick={() => setPaymentMethod('bank')} className={`py-2 px-1 text-[11px] font-mono font-medium rounded-lg border text-center transition ${paymentMethod === 'bank' ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold ring-1 ring-amber-500/50' : 'border-[#2B2F36] bg-[#1D2024] text-stone-400 hover:border-stone-600'}`}>Bank EFT</button>
        </div>

        <label className="flex items-center gap-2.5 p-2.5 bg-[#1D2024] border border-[#2B2F36] rounded-lg cursor-pointer hover:border-stone-600 transition">
          <input type="checkbox" checked={payInFour} onChange={(e) => setPayInFour(e.target.checked)} className="w-4 h-4 accent-amber-500 shrink-0" />
          <span className="text-[11px] text-stone-300 font-mono leading-tight">
            <strong className="text-amber-300">Split into Pay in 4</strong> — 4 fortnightly instalments, 0% interest, no deposit
          </span>
        </label>
      </div>

      {isPayIn4 && (
        <div className="p-3 bg-[#17191C] border border-amber-500/30 rounded-xl text-xs text-stone-300 space-y-2">
          <div className="flex items-center justify-between text-amber-300 font-bold font-mono">
            <span className="flex items-center gap-1">💳 Pay in 4 Schedule</span>
            <span>0% Interest</span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-[11px] text-center font-mono">
            {['Today', '2 Wks', '4 Wks', '6 Wks'].map((label) => (
              <div key={label} className="bg-[#121417] p-1.5 rounded border border-stone-800">
                <div className="text-stone-400">{label}</div>
                <div className="font-bold text-white">${payIn4Instalment}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {paymentMethod === 'payid' && (
        <div className="p-3 bg-[#17191C] border border-[#2B2F36] rounded-xl text-xs text-stone-300 space-y-2 font-mono">
          <p className="text-[11px] text-amber-200 leading-snug bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-2">
            <strong className="text-amber-300 font-bold">PayID pays via Osko</strong> — it clears instantly, so your order gets confirmed fastest. We&apos;ll send our PayID and the payment reference to you by email/WhatsApp after you place the order.
          </p>
          <CopyField label="Reference" value={orderNumber} />
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="p-3 bg-[#17191C] border border-[#2B2F36] rounded-xl text-xs text-stone-300 space-y-2 font-mono">
          <p className="text-[11px] text-amber-200 leading-snug bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-2">
            <strong className="text-amber-300 font-bold">Use Osko / PayID transfer</strong> where your bank supports it — it clears instantly, so your order gets confirmed fastest. We&apos;ll send our bank details and the payment reference to you by email/WhatsApp after you place the order.
          </p>
          <CopyField label="Reference" value={orderNumber} />
        </div>
      )}

      {/* Price calculations */}
      <div className="space-y-1.5 text-xs text-stone-400 font-mono bg-[#141619] p-4 rounded-xl border border-[#2B2F36]">
        <div className="flex justify-between items-baseline">
          <span className="flex items-center gap-1.5">
            <span>Subtotal</span>
            {isPayIn4 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">1st Instalment</span>}
          </span>
          <div className="text-right">
            <span className="font-semibold text-stone-200">${displayedSubtotal.toLocaleString()} AUD</span>
            {isPayIn4 && <div className="text-[10px] text-stone-400 line-through">Full: ${totals.finalTotal.toLocaleString()} AUD</div>}
          </div>
        </div>

        {bundleSavings > 0 && (
          <div className={`flex justify-between text-emerald-400 ${isPayIn4 ? 'text-[10px]' : 'font-bold'}`}>
            <span>{isPayIn4 ? 'Incl. 5% bundle discount' : 'Bundle Discount (5% off parts & gear with a bike)'}</span>
            <span>-${bundleSavings.toLocaleString()} AUD</span>
          </div>
        )}

        {paymentMethod === 'crypto' && (
          <div className="flex justify-between text-emerald-400 font-bold">
            <span>10% Crypto Discount (BTC/USDT)</span>
            <span>-${cryptoSavings.toLocaleString()} AUD</span>
          </div>
        )}

        <div className="flex justify-between items-baseline">
          <span className="flex items-center gap-1.5">
            <span>Freight Delivery</span>
            {isPayIn4 && shippingCost > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold">1st of 4</span>}
          </span>
          <div className="text-right">
            <span>{shippingCost === 0 ? <span className="text-emerald-400 uppercase font-bold">Free</span> : `$${displayedShipping.toLocaleString()} AUD`}</span>
            {isPayIn4 && shippingCost > 0 && <div className="text-[10px] text-stone-400 line-through">Full: ${shippingCost} AUD</div>}
          </div>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="flex items-center gap-1.5">
            <span>GST (10%, included)</span>
            {isPayIn4 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold">this instalment</span>}
          </span>
          <div className="text-right">
            <span className="text-stone-300">${gstOnDisplayedTotal.toLocaleString()} AUD</span>
            {isPayIn4 && <div className="text-[10px] text-stone-400">Full order GST: ${gstOnTotal.toLocaleString()} AUD</div>}
          </div>
        </div>

        <div className="flex justify-between items-baseline text-sm font-bold text-stone-100 pt-2.5 border-t border-[#2B2F36]">
          <div>
            <span className="text-white">{isPayIn4 ? 'Total (1st Instalment Due Today)' : 'Total Amount (Inc. GST)'}</span>
            <div className="text-[10px] font-normal text-emerald-400 mt-0.5 font-mono">✓ Incl. ${gstOnDisplayedTotal.toLocaleString()} AUD GST (10%) · Tax invoice provided</div>
            {isPayIn4 && <div className="text-[10px] font-normal text-amber-400/90 mt-0.5">Followed by 3 fortnightly payments of ${payIn4Instalment.toLocaleString()} AUD</div>}
          </div>
          <div className="text-right">
            <span className="text-amber-400 text-lg font-black font-mono">${displayedTotal.toLocaleString()} AUD</span>
            {isPayIn4 && <div className="text-[10px] font-normal text-stone-400 line-through">Full Order: ${grandTotal.toLocaleString()} AUD</div>}
          </div>
        </div>
      </div>

      {/* Delivery details */}
      <div className="space-y-2 bg-[#141619] p-4 rounded-xl border border-[#2B2F36]">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-300 font-mono">Delivery Details</h3>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" value={customer.name} onChange={updateCustomer('name')} placeholder="Full Name *" aria-label="Full name" className="col-span-2 bg-[#1D2024] border border-[#2B2F36] rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          <input type="email" value={customer.email} onChange={updateCustomer('email')} placeholder="Email *" aria-label="Email address" className="bg-[#1D2024] border border-[#2B2F36] rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          <input type="tel" value={customer.phone} onChange={updateCustomer('phone')} placeholder="Phone *" aria-label="Phone number" className="bg-[#1D2024] border border-[#2B2F36] rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          <input type="text" value={customer.address} onChange={updateCustomer('address')} placeholder="Street Address *" aria-label="Street address" className="col-span-2 bg-[#1D2024] border border-[#2B2F36] rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          <input type="text" value={customer.suburb} onChange={updateCustomer('suburb')} placeholder="Suburb *" aria-label="Suburb" className="bg-[#1D2024] border border-[#2B2F36] rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          <select value={customer.state} onChange={updateCustomer('state')} aria-label="State" className="bg-[#1D2024] border border-[#2B2F36] rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:ring-1 focus:ring-amber-500 focus:border-amber-500">
            {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="text" value={customer.postcode} onChange={updateCustomer('postcode')} placeholder="Postcode *" aria-label="Postcode" className="col-span-2 bg-[#1D2024] border border-[#2B2F36] rounded-lg px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
        </div>
      </div>

      {/* Checkout actions */}
      <div className="space-y-2 pt-1">
        {orderError && <p className="text-[11px] text-rose-400 font-semibold text-center">{orderError}</p>}
        <a
          href={customerValid ? buildWhatsAppOrderUrl() : '#'}
          target={customerValid ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-disabled={!customerValid}
          onClick={handleWhatsAppClick}
          className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-lg text-center ${customerValid ? 'bg-[#25D366] hover:bg-[#20bd5a] text-black cursor-pointer' : 'bg-[#25D366]/40 text-black/60 cursor-not-allowed'}`}
        >
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.183-.077.359.101.176.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z" />
          </svg>
          <span>{isPayIn4 ? `Checkout via WhatsApp (1st Instalment: $${displayedTotal.toLocaleString()} AUD)` : 'Checkout via WhatsApp'}</span>
        </a>

        <button
          type="button"
          onClick={handleEmailOrder}
          disabled={orderStatus === 'sending'}
          className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-xl text-sm transition text-center ${customerValid ? 'bg-[#8C4A2F] hover:bg-[#A35839] text-white cursor-pointer' : 'bg-[#8C4A2F]/40 text-white/60 cursor-not-allowed'}`}
        >
          {orderStatus === 'sending' ? (
            <span>Sending Order...</span>
          ) : (
            <span>{isPayIn4 ? `Email My Order (1st Instalment: $${displayedTotal.toLocaleString()} AUD)` : 'Email My Order'}</span>
          )}
        </button>
        <p className="text-[10px] text-stone-500 text-center">
          Order reference {orderNumber} — both options send the same order details.
        </p>
      </div>
    </div>
  );
}
