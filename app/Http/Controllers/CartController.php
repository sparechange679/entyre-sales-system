<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Part;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Display the shopping cart
     */
    public function index(): Response
    {
        $cartItems = CartItem::with(['part.primaryImage', 'part.category'])
            ->where('user_id', auth()->id())
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'part' => [
                        'id' => $item->part->id,
                        'name' => $item->part->name,
                        'brand' => $item->part->brand,
                        'price' => floatval($item->part->price),
                        'image' => $item->part->primaryImage?->image_url ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
                        'stockQuantity' => $item->part->stock_quantity,
                        'category' => $item->part->category?->name ?? 'Part',
                    ],
                ];
            });

        $total = $cartItems->sum(function ($item) {
            return $item['part']['price'] * $item['quantity'];
        });

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * Add item to cart
     */
    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            'part_id' => ['required', 'exists:parts,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $part = Part::findOrFail($request->part_id);

        if (! $part->isInStock()) {
            return back()->with('error', 'This part is out of stock.');
        }

        if ($request->quantity > $part->stock_quantity) {
            return back()->with('error', 'Requested quantity exceeds available stock.');
        }

        $cartItem = CartItem::where('user_id', auth()->id())
            ->where('part_id', $request->part_id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $request->quantity;

            if ($newQuantity > $part->stock_quantity) {
                return back()->with('error', 'Cannot add more items. Stock limit reached.');
            }

            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            CartItem::create([
                'user_id' => auth()->id(),
                'part_id' => $request->part_id,
                'quantity' => $request->quantity,
            ]);
        }

        return back()->with('success', 'Item added to cart successfully!');
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        if ($request->quantity > $cartItem->part->stock_quantity) {
            return back()->with('error', 'Requested quantity exceeds available stock.');
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Cart updated successfully!');
    }

    /**
     * Remove item from cart
     */
    public function destroy(CartItem $cartItem): RedirectResponse
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart.');
    }

    /**
     * Clear all items from cart
     */
    public function clear(): RedirectResponse
    {
        CartItem::where('user_id', auth()->id())->delete();

        return back()->with('success', 'Cart cleared successfully!');
    }
}
