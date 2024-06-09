'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useTransactions } from "@/hooks/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface OfxTabProps {
    close: () => void
}

const formSchema = z.object({
    file: z.instanceof(FileList).optional(),
});

export const OfxTab = ({ close }: OfxTabProps) => {
    const { importOfx } = useTransactions()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const fileRef = form.register("file");

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (!data.file?.[0]) {
            return toast({
                title: "Atenção",
                description: "Você precisa selecionar um arquivo para importar",
                variant: 'destructive'
            })
        }

        importOfx(data.file[0]);
        close();
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
                                    <FormLabel>Arquivo:* </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".ofx"
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
