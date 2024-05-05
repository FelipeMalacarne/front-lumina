'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// TODO: that component is trash, fix it
export function PieExpensesCard() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(data[0].name)


    return (
        <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-primary text-sm font-medium">
                    Despesas por Categoria
                </CardTitle>
                <ArrowDown color="hsl(var(--destructive))" />
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">

                {/* info with color ball, name and value */}

                <div className="grid">

                    {
                        data.map((entry, index) => (
                            <div key={entry.name} className="flex flex-row items-center space-x-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                <p className="text-sm font-medium">{entry.name}</p>
                                <p className="text-sm font-medium">{entry.value}</p>
                            </div>
                        ))
                    }

                </div>


                <ResponsiveContainer width="100%" height={350}>

                    <PieChart width={350} height={350}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            // cy="50%"
                            // cx="50%"
                            stroke="#888888"
                        // fill="#8884d8"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} onClick={() => setSelectedCategory(entry.name)} />
                            ))}


                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card >
    )
}
