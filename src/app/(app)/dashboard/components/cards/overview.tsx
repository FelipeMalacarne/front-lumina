"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
]

const CustomTooltip = ({ activeBar, data }: any) => {
    if (activeBar === null) {
        return null;
    }

    const { name, total } = data[activeBar];

    return (
        <div className="bg-card text-card-foreground border p-2 rounded shadow-md">
            <p className="font-bold text-primary">{name}</p>
            <p>Total: ${total}</p>
        </div>
    );
};

export function OverviewCard() {
    const [activeBar, setActiveBar] = useState(null);

    const handleMouseEnter = (data: any, index: any) => {
        setActiveBar(index);
    };

    const handleMouseLeave = () => {
        setActiveBar(null);
    };

    // hiding error until recharts updates or fix it 
    const error = console.error;
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return (
        <>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Bar
                                dataKey="total"
                                fill="currentColor"
                                radius={[4, 4, 0, 0]}
                                className="fill-primary"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                            <Tooltip
                                content={<CustomTooltip activeBar={activeBar} data={data} />}
                                cursor={{
                                    fill: "rgba(0, 0, 0, 0.2)",
                                    strokeWidth: 2,
                                }}

                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </>
    )
} 
