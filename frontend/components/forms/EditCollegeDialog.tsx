"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"


const formSchema = z.object({
    collegeCode: z.string().min(1),
    collegeName: z.string().min(1)
})

type College = z.infer<typeof formSchema>

export function EditCollegeDialogue({ college }: {college: College}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            collegeCode: "",
            collegeName: "",
        },
    })
    const [open, setOpen] = useState(false)

    useEffect(() => {
    if (college) {
      form.reset({
        collegeCode: college.collegeCode,
        collegeName: college.collegeName,
      })
    }
  }, [college, form])


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="m-2">
                <Button>Edit College</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit College</DialogTitle>
                    <DialogDescription>Fill in the form to edit college information.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="collegeCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>College Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter College Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="collegeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>College Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter College Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
