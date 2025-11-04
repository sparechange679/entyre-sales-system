<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Part;
use App\Notifications\OrderReceipt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    /**
     * Create a checkout session for cart items
     */
    public function checkout(): Response
    {
        $cartItems = CartItem::with(['part.primaryImage'])
            ->where('user_id', auth()->id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $total = $cartItems->sum(function ($item) {
            return $item->part->price * $item->quantity;
        });

        Stripe::setApiKey(config('services.stripe.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount' => (int) ($total * 100), // Convert to cents
            'currency' => 'mwk',
            'metadata' => [
                'user_id' => auth()->id(),
            ],
        ]);

        return Inertia::render('checkout/index', [
            'cartItems' => $cartItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'part' => [
                        'id' => $item->part->id,
                        'name' => $item->part->name,
                        'brand' => $item->part->brand,
                        'price' => floatval($item->part->price),
                        'image' => $item->part->primaryImage?->image_url ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
                    ],
                ];
            }),
            'total' => $total,
            'clientSecret' => $paymentIntent->client_secret,
            'stripeKey' => config('services.stripe.key'),
        ]);
    }

    /**
     * Create a direct checkout for a single part
     */
    public function buyNow(Request $request): Response
    {
        $request->validate([
            'part_id' => ['required', 'exists:parts,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $part = Part::with(['primaryImage'])->findOrFail($request->part_id);

        if (! $part->isInStock()) {
            return back()->with('error', 'This part is out of stock.');
        }

        if ($request->quantity > $part->stock_quantity) {
            return back()->with('error', 'Requested quantity exceeds available stock.');
        }

        $total = $part->price * $request->quantity;

        Stripe::setApiKey(config('services.stripe.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount' => (int) ($total * 100), // Convert to cents
            'currency' => 'mwk',
            'metadata' => [
                'user_id' => auth()->id(),
                'part_id' => $part->id,
                'quantity' => $request->quantity,
            ],
        ]);

        return Inertia::render('checkout/index', [
            'cartItems' => [[
                'quantity' => $request->quantity,
                'part' => [
                    'id' => $part->id,
                    'name' => $part->name,
                    'brand' => $part->brand,
                    'price' => floatval($part->price),
                    'image' => $part->primaryImage?->image_url ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
                ],
            ]],
            'total' => $total,
            'clientSecret' => $paymentIntent->client_secret,
            'stripeKey' => config('services.stripe.key'),
            'isBuyNow' => true,
        ]);
    }

    /**
     * Process successful payment
     */
    public function success(Request $request): RedirectResponse
    {
        $request->validate([
            'payment_intent' => ['required', 'string'],
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $paymentIntent = PaymentIntent::retrieve($request->payment_intent);

            if ($paymentIntent->status !== 'succeeded') {
                return redirect()->route('cart.index')
                    ->with('error', 'Payment was not successful.');
            }

            DB::transaction(function () use ($paymentIntent) {
                $user = auth()->user();

                // Create order
                $order = Order::create([
                    'user_id' => $user->id,
                    'stripe_payment_intent_id' => $paymentIntent->id,
                    'stripe_payment_status' => $paymentIntent->status,
                    'total_amount' => $paymentIntent->amount / 100,
                    'status' => 'completed',
                    'customer_email' => $user->email,
                    'customer_name' => $user->name,
                ]);

                // Check if this is a buy now or cart checkout
                if (isset($paymentIntent->metadata->part_id)) {
                    // Buy now - single item
                    $part = Part::findOrFail($paymentIntent->metadata->part_id);

                    OrderItem::create([
                        'order_id' => $order->id,
                        'part_id' => $part->id,
                        'quantity' => $paymentIntent->metadata->quantity,
                        'price' => $part->price,
                        'part_name' => $part->name,
                        'part_sku' => $part->sku,
                    ]);

                    // Update stock
                    $part->decrement('stock_quantity', $paymentIntent->metadata->quantity);
                } else {
                    // Cart checkout - multiple items
                    $cartItems = CartItem::with('part')
                        ->where('user_id', $user->id)
                        ->get();

                    foreach ($cartItems as $cartItem) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'part_id' => $cartItem->part->id,
                            'quantity' => $cartItem->quantity,
                            'price' => $cartItem->part->price,
                            'part_name' => $cartItem->part->name,
                            'part_sku' => $cartItem->part->sku,
                        ]);

                        // Update stock
                        $cartItem->part->decrement('stock_quantity', $cartItem->quantity);
                    }

                    // Clear cart
                    CartItem::where('user_id', $user->id)->delete();
                }

                // Send receipt email
                $user->notify(new OrderReceipt($order));
            });

            return redirect()->route('checkout.thankyou', [
                'payment_intent' => $request->payment_intent,
            ]);
        } catch (\Exception $e) {
            return redirect()->route('cart.index')
                ->with('error', 'An error occurred processing your payment. Please contact support.');
        }
    }

    /**
     * Display thank you page
     */
    public function thankYou(Request $request): Response
    {
        $request->validate([
            'payment_intent' => ['required', 'string'],
        ]);

        $order = Order::with('items.part')
            ->where('stripe_payment_intent_id', $request->payment_intent)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return Inertia::render('checkout/thank-you', [
            'order' => [
                'id' => $order->id,
                'total' => floatval($order->total_amount),
                'status' => $order->status,
                'createdAt' => $order->created_at->format('F j, Y g:i A'),
                'items' => $order->items->map(function ($item) {
                    return [
                        'name' => $item->part_name,
                        'quantity' => $item->quantity,
                        'price' => floatval($item->price),
                    ];
                }),
            ],
        ]);
    }
}
