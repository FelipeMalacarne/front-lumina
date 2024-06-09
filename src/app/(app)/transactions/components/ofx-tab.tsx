'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useTransactions } from "@/hooks/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    file: z.instanceof(FileList).optional(),
});

export const OfxTab = () => {
    const { importOfx } = useTransactions()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const fileRef = form.register("file");

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (!data.file?.[0]) return;

        importOfx(data.file[0]);
    };

    return (
        <TabsContent value="ofx">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            {...fileRef}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </TabsContent>
    )
}
