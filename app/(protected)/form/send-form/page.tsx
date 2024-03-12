"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SendFormSchema } from "@/shemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { startTransition, useState, useTransition } from "react";
import { SendForm } from "@/action/sendmail";

const SentForm = () => {
    const [error, setError] = useState< string | undefined >("");
    const [success, setSuccess] = useState< string | undefined >("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SendFormSchema>>({
        resolver: zodResolver(SendFormSchema),
        defaultValues: {
            email: "",
            name: "",
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof SendFormSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            SendForm(values)
                .then((data) => {
                    if(data?.error){
                        form.reset();
                        setError(data.error)
                    }

                    if(data?.success){
                        form.reset();
                        setSuccess(data.success)
                    }
                })
                .catch( () => setError("Something went wrong"))

        })

    }
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>отправка формы</CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="jo@mail.ru"
                                            type={"email"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Fio"
                                            type={"text"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"description"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="message for send"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Отправить
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SentForm;