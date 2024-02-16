import Link from 'next/link'
import React from 'react'

export default function Nav() {
  return (
    <div className='w-[400px] flex m-auto justify-around'>
        <Link href={'/reports?status=Pending'}>report</Link>
        <Link href={'/verification/identity?isSubmitted=true&isVerified=false'}>identity verification</Link>
        <Link href={'/verification/payment?isSubmitted=true&isVerified=false'}>payment verification</Link>
        <Link href={'/payment/from-us?date=2024-02-16&range=year'}>sell</Link>
    </div>
  )
}
