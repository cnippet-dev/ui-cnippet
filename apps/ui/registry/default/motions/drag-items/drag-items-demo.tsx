"use client";
import React, { useState } from "react";
import { DragItems, Item } from "@/components/motion/drag-items";
import { Card, CardContent } from "@/components/ui/card";

export default function ParentComponent() {
    const [items, setItems] = useState([
        {
            id: 1,
            title: "Follow me on X",
            subtitle: "Get more update follow me on X",
            date: "32.8.2024",
            src: "https://images.unsplash.com/photo-1724908549265-06972c22ca37?q=80&w=2070&auto=format&fit=crop",
            link: "https://x.com/naymur_dev",
            category: "Social",
        },
        {
            id: 2,
            title: "Star the repo",
            subtitle: "If you like star the repo",
            date: "32.8.2024",
            src: "https://images.unsplash.com/photo-1724908549265-06972c22ca37?q=80&w=2070&auto=format&fit=crop",
            link: "https://github.com/ui-layouts/uilayouts",
            category: "GitHub",
        },
        {
            id: 3,
            title: "Share it with your friend",
            subtitle: "if you like it, please Share it with your friend ",
            date: "32.8.2024",
            src: "https://images.unsplash.com/photo-1724908549265-06972c22ca37?q=80&w=2070&auto=format&fit=crop",
            link: "https://www.ui-layout.com/",
            category: "Community",
        },
    ]);

    return (
        <div className="mx-auto max-w-lg py-6">
            <div className="mb-4 text-center">
                <h1 className="text-lg font-medium">Drag & Drop Items</h1>
                <p className="text-muted-foreground text-sm">Drag to reorder</p>
            </div>

            <DragItems items={items} onReorder={setItems}>
                {items.map((item) => (
                    <Item key={item.id} item={item}>
                        <Card className="w-full border-none shadow-none">
                            <CardContent className="p-3">
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-medium">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground text-xs">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Item>
                ))}
            </DragItems>
        </div>
    );
}
