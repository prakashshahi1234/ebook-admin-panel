"use client";
import { Axios } from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { object, z } from "zod";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from 'next/navigation'
import { toast } from "sonner";
import { Accordino } from "../verification/identity/page";
const ReporterSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  isVerified: z.boolean(),
  isSuspended: z.boolean(),
  isDeleted: z.boolean(),
});

const BookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  isDeleted: z.boolean(),
  isSuspended: z.boolean(),
  unPublished: z.boolean(),
});

const AuthorSchema = ReporterSchema;

const ReportDocumentSchema = z.object({
  _id: z.string(),
  book: BookSchema,
  isSuspended: z.boolean(),
  isDeleted: z.boolean(),
  isPublished: z.boolean(),
  reporter: ReporterSchema,
  report: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: AuthorSchema,
  isVisibleToAuthor:z.boolean()
});

type ReportSchema = z.infer<typeof ReportDocumentSchema>;
type Author = z.infer<typeof AuthorSchema>;

export default function Page() {
  const params = useSearchParams()
  const status = params.get("status")

  const {data: reports,isLoading,isError,error,} = useQuery<ReportSchema[]>({
    queryKey: ["loadReports"],
    queryFn: async () => {
      return (await Axios.get(`/get-pending?status=${status}`)).data.reports;
           },
     });

  const reportUpdateMutation = useMutation({
    mutationKey:["visibility-mutaion"],
    mutationFn:async({obj, _id}:{obj:any, _id:string})=>{
       return await Axios.post(`/update-report/${_id}`, {...obj})
    }
  })

  const updateBookMutation = useMutation({
    mutationKey:["update-book-mutaion"],
    mutationFn:async({obj, _id}:{obj:any, _id:string})=>{
       return await Axios.post(`/update-book/${_id}`, {...obj})
    }
  })


  const updateUserMutation = useMutation({
    mutationKey:["update-user-mutaion"],
    mutationFn:async({obj, _id}:{obj:any, _id:string})=>{
       return await Axios.post(`/update-user-by-admin/${_id}`, {...obj})
    }
  })
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if(reports?.length==0) return <p>No reports.</p>

  return (<div className="overflow-x-auto">
  <Table className="min-w-fit border border-collapse">
    <TableCaption className="text-lg font-bold text-center mb-4">A list of pending reports.</TableCaption>
    <TableHeader>
      <TableRow className="bg-gray-200">
        {reports &&
          Object.entries(reports[0]).map(([key, value]) => {
            return (
              <TableHead key={key} className="py-2 px-4 font-bold">
                {key.toString()}
              </TableHead>
            );
          })}
      </TableRow>
    </TableHeader>
    <TableBody>
      {reports?.map((report: ReportSchema) => (
        <TableRow key={report._id} className="hover:bg-gray-100 transition duration-300">
          <TableCell className="py-2 px-4 font-medium">{report._id}</TableCell>
          <TableCell className="py-2 px-4">
            <Accordino list={report.book} />
               <Select defaultValue={report.book.isSuspended.toString()} onValueChange={(value) => {
                updateBookMutation.mutate(
                  {
                    obj: {
                      "isSuspended.suspended": JSON.parse(value),
                      "isSuspended.suspendedAt":new Date(),
                      "isDeleted.deleted": (value === "true") && false ,
                      "unPublished":( value === "true") && false,

                    },
                    _id: report.book._id,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Updated");
                    },
                    onError: (err) => toast.error(err.message),
                  }
                );
            }} >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="false">well</SelectItem>
                <SelectItem value="true">suspended</SelectItem>
              </SelectContent>
               </Select>
               <Select defaultValue={report.book.isSuspended.toString()} onValueChange={(value) => {
                updateBookMutation.mutate(
                  {
                    obj: {
                      "isSuspended.suspended": JSON.parse(value),
                      "isSuspended.suspendedAt":new Date(),
                      "isDeleted.deleted": (value === "true") && false ,
                      "unPublished":( value === "true") && false,

                    },
                    _id: report.book._id,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Updated");
                    },
                    onError: (err) => toast.error(err.message),
                  }
                );
            }} >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="false">back to live</SelectItem>
                <SelectItem value="true">suspended</SelectItem>
              </SelectContent>
               </Select>
          </TableCell>
          <TableCell className="py-2 px-4">
            <Accordino list={report.reporter} />
            <Select defaultValue={report.reporter.isSuspended.toString()} onValueChange={(value) => {
                updateUserMutation.mutate(
                  {
                    obj: {
                      "isSuspended.suspended": JSON.parse(value),
                      "isSuspended.suspendedAt":new Date(),
                      "isDeleted.deleted": (value === "true") && false ,
                    },
                    _id: report.reporter._id,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Updated");
                    },
                    onError: (err) => toast.error(err.message),
                  }
                );
            }} >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="false">remove suspension</SelectItem>
                <SelectItem value="true">suspended</SelectItem>
              </SelectContent>
              </Select>
              <Select defaultValue={report.reporter.isDeleted.toString()} onValueChange={(value) => {
                updateUserMutation.mutate(
                  {
                    obj: {
                      "isDeleted.deleted": JSON.parse(value),
                      "isDeleted.deletedAt":new Date(),
                      "isSuspended.suspended": (value === "true") && false ,
                    },
                    _id: report.reporter._id,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Updated");
                    },
                    onError: (err) => toast.error(err.message),
                  }
                );
            }} >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="false">Back to live</SelectItem>
                <SelectItem value="true">delete user</SelectItem>
              </SelectContent>
              </Select>
          </TableCell>
          <TableCell className="py-2 px-4">{report.report}</TableCell>

          <TableCell className="py-2 px-4">
            <Select defaultValue={report.status} onValueChange={(value) => {
                reportUpdateMutation.mutate(({obj:{status:value},_id:report._id}),{
                  onSuccess:()=>{toast.success("Updated")},
                  onError:(err)=>toast.error(err.message)
                 })
            }}>
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Resolving">Resolving</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="py-2 px-4">
            <Select defaultValue={report.isVisibleToAuthor.toString()} onValueChange={(value) => {
                reportUpdateMutation.mutate(({obj:{isVisibleToAuthor:value},_id:report._id}),{
                  onSuccess:()=>{toast.success("Updated")},
                  onError:(err)=>toast.error(err.message)
                 })
            }} >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="false">Invisible</SelectItem>
                <SelectItem value="true">Visible</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="py-2 px-4">
            {new Date(report.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell className="py-2 px-4">
            {new Date(report.updatedAt).toLocaleDateString()}
          </TableCell>
          <TableCell className="py-2 px-4">
            <Accordino list={report.author} />
              <Select defaultValue={report.reporter.isSuspended.toString()} onValueChange={(value) => {
                updateUserMutation.mutate(
                  {
                    obj: {
                      "isSuspended.suspended": JSON.parse(value),
                      "isSuspended.suspendedAt":new Date(),
                      "isDeleted.deleted": (value === "true") && false ,
                    },
                    _id: report.reporter._id,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Updated");
                    },
                    onError: (err) => toast.error(err.message),
                  }
                );
            }} >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="false">remove suspension</SelectItem>
                <SelectItem value="true">suspended</SelectItem>
              </SelectContent>
              </Select>
              <Select defaultValue={report.reporter.isDeleted.toString()} onValueChange={(value) => {
                updateUserMutation.mutate(
                  {
                    obj: {
                      "isDeleted.deleted": JSON.parse(value),
                      "isDeleted.deletedAt":new Date(),
                      "isSuspended.suspended": (value === "true") && false ,
                    },
                    _id: report.reporter._id,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Updated");
                    },
                    onError: (err) => toast.error(err.message),
                  }
                );
            }} >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                <SelectItem value="false">Back to live</SelectItem>
                <SelectItem value="true">delete user</SelectItem>
              </SelectContent>
              </Select>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
);
}








