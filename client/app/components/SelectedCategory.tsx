'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { categoryItems } from '../lib/categoryItems';
import Image from 'next/image';
import { useState } from 'react';

export function SelctetCategory() {
    const [selectedCategory, setSelectredCategory] = useState<string | undefined>(undefined);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
            <input type="hidden" name="categoryName" value={selectedCategory as string} />
            {categoryItems.map((item) => (
                <div key={item.id} className="cursor-pointer">
                    <Card
                        className={selectedCategory === item.name ? 'border-primary' : ''}
                        onClick={() => setSelectredCategory(item.name)}
                    >
                        <CardHeader>
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                height={32}
                                width={32}
                                className="w-8 h-8"
                            />

                            <h3 className="font-medium hidden lg:block sm:text-xs lg:text-sm">
                                {item.title}
                            </h3>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    );
}
