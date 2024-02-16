import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { Axios } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    
    const params = useSearchParams()
    const {data:payment , isLoading , isError} = useQuery({
    queryKey:[`load-payment-${params}`],
    queryFn:async()=>{
        return (await Axios.get(`/get-payment?${params}`)).data.payment
    }
  })

  if(isLoading) return <Loading/>
  if(isError) return <Error/>
  if(payment.length==0) return <p>No data</p>
  console.log(payment)
  return (
    <div>

    </div>
  )
}
