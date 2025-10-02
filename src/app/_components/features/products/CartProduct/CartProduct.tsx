
import { getCartProducts, deleteCartProduct, updateProductCartAmount } from '@/store/Slices/cartSlice';
import { productCartType } from '@/types/cartTupes'
import Image from 'next/image'
import React, { useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

enum CountActionKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

interface CountAction {
  type: CountActionKind;
  payload: number; // Or a more specific type if needed
}

interface CountState {
  count: number;
}

function counterReducer(state: CountState, action: CountAction): CountState {
  switch (action.type) {
    case CountActionKind.INCREASE:
      return { ...state, count: state.count + action.payload };
    case CountActionKind.DECREASE:
      return { ...state, count: state.count - action.payload };
    default:
      return state; // Always return the state in the default case
  }
}

export default function CartProduct({ product }: { product: productCartType }) {
  const dispatch = useDispatch<any>();
  const session = useSession();
  const [state, dispatchReducer] = useReducer(counterReducer, {count:product.count})
  useEffect(() => {
    console.log(session.data?.token);

  })

  function deleteProduct() {
    try {
      dispatch(deleteCartProduct({ productId: product._id, token: session.data?.token }));
      toast.success("deleted successfuly");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
    }
  }

  return (
    <div>
      <div className="card-img">
        <Image src={product.product.imageCover} alt={product.product.title} width={200} height={200} />
      </div>
      <div className="details space-y-5">
        <h3 className='text-center'><span>price :</span>{product.price}</h3>
        <div className="btn-group flex gap-5">
          <button onClick={() => dispatchReducer({type:CountActionKind.INCREASE , payload:1})} className='bg-green-400 hover:bg-green-500 transition-colors rounded-lg w-1/2 '>+</button>
          <p>{state.count} </p>
          <button  onClick={() => dispatchReducer({type:CountActionKind.DECREASE , payload:1})} className='bg-red-400 hover:bg-red-500 transition-colors rounded-lg w-1/2 '>-</button>
        </div>
      </div>
      <div className="card-footer">
        <button className='bg-red-600 hover:bg-red-700 w-full rounded-lg my-3' onClick={deleteProduct}>
          remove
        </button>
      </div>
    </div>
  )
}
