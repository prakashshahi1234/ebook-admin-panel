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


import { object, z } from "zod";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function Page() {
  const params = useSearchParams();
  const {
    data: identity,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["loadidentity"],
    queryFn: async () => {
      return (await Axios.get(`/verification?${params}`)).data.allIdentity;
    },
  });

  const updateIdentityMutation = useMutation({
    mutationKey: ["update-mutaion"],
    mutationFn: async ({ obj, _id }: { obj: any; _id: string }) => {
      return await Axios.post(`/update-identity/${_id}`, { ...obj });
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (identity?.length == 0) return <p>No data.</p>;

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-fit border border-collapse">
        <TableCaption className="text-lg font-bold text-center mb-4">
          A list of identification detail for verification.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-200">
            {identity &&
              Object.entries(identity[0]).map(([key, value]) => {
                return (
                  <TableHead key={key} className="py-2 px-4 font-bold">
                    {key.toString()}
                  </TableHead>
                );
              })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {identity?.length > 0 &&
            identity?.map((item: any, key: number) => (
              <TableRow key={key}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.email_verified.toString()}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(item.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{item._v}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.name}</TableCell>

                <TableCell>
                  <Image
                    src={item.profileImageUrl || "/"}
                    alt={item.name}
                    height={200}
                    width={200}
                  />
                </TableCell>
                <TableCell>{item.mobileNo || "-"}</TableCell>

                <TableCell>
                  <Image
                    src={item.identityDetail.identityImageUrl}
                    alt={item.name}
                    height={200}
                    width={200}
                  />
                  {<Accordino list={item.identityDetail} />}
                  <Select
                    defaultValue={item.identityDetail.isSubmitted.toString()}
                    onValueChange={(value) => {
                      updateIdentityMutation.mutate(
                        {
                          obj: {
                            "identityDetail.isSubmitted": JSON.parse(value),
                          },
                          _id: item._id,
                        },
                        {
                          onSuccess: () => {
                            toast.success("Updated");
                          },
                          onError: (err) => toast.error(err.message),
                        }
                      );
                    }}
                  >
                    <SelectTrigger className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                      <SelectItem value="true">Submitted</SelectItem>
                      <SelectItem value="false">Enable Editing</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    defaultValue={item.identityDetail.isVerified.toString()}
                    onValueChange={(value) => {
                      updateIdentityMutation.mutate(
                        {
                          obj: {
                            "identityDetail.isVerified": JSON.parse(value),
                          },
                          _id: item._id,
                        },
                        {
                          onSuccess: () => {
                            toast.success("Updated");
                          },
                          onError: (err) => toast.error(err.message),
                        }
                      );
                    }}
                  >
                    <SelectTrigger className="my-2 bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-pointer">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-md mt-2">
                      <SelectItem value="true">update to verified</SelectItem>
                      <SelectItem value="false">
                        update to unverified
                      </SelectItem>
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

export const Accordino = ({ list }: { list: any }) => {
  return (
    <Accordion type="single" collapsible className="border rounded shadow-md">
      <AccordionItem value="item-1" className="mb-2">
        <AccordionTrigger className="p-2 cursor-pointer">
          {list.name || list.email || list.title || list._id}
        </AccordionTrigger>
        <AccordionContent className="p-4">
          {Object.entries(list).map(([key, value]) => {
            return (
              <p key={key} className="mb-2">
                <Label className="font-bold">{key.toString()}:</Label>{" "}
                <Input defaultValue={value?.toString()} />
              </p>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
