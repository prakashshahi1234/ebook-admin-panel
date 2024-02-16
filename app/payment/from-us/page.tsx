"use client"
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { Axios } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

import React from 'react'
import { Accordino } from '@/app/verification/identity/page'
export default function Page() {
  const param = useSearchParams()
  const {data:monthlySell, isLoading , isError} = useQuery({
    queryKey:['load-monthly'],
    queryFn:async()=>{
     return (await Axios.get(`/get-all-sell?${param}`)).data.sell
    }
  })
  if(isLoading) return <Loading/>
  if(isError) return <Error/>
  if(monthlySell.length<=0) return <p>No data</p>
  return (
    <div>
        <Table className="min-w-fit border border-collapse">
    <TableCaption className="text-lg font-bold text-center mb-4">A list of sells.</TableCaption>
    <TableHeader>
      <TableRow className="bg-gray-200">
        {monthlySell &&
          Object.entries(monthlySell[0]).map(([key, value]) => {
            return (
              <TableHead key={key} className="py-2 px-4 font-bold">
                {key.toString()}
              </TableHead>
            );
          })}
      </TableRow>
    </TableHeader>
    <TableBody>
    {monthlySell &&

          Object.entries(monthlySell[0]).map(([key, value]) => {
            return (
              <TableCell key={key} className="py-2 px-4 font-bold">
                {(typeof value == 'string'|| typeof value =='number') && <p>{value}</p>}
                {Array.isArray((value)) && value.map((item , key)=>{return <Accordino key={key} list={{...item, title:"book"}}/>})}
                {(!(Array.isArray(value)) && typeof value!="string" && typeof value!=="number") 
                  && <Accordino list={value}/>
                 }
              </TableCell>
            
         ) })}
    </TableBody>
    </Table>
    </div>
  )
}
