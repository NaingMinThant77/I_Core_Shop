"use client"
import { ColumnDef, Row } from "@tanstack/react-table"
import Image from "next/image"
import { CirclePlus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks"
import { deleteProduct } from "@/server/actions/products"
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { VariantsWithImagesTags } from "@/lib/infer-type"
import VariantDialog from "@/components/products/variant-dialog"

export type Product = {
    id: number
    price: number
    title: string
    description: string
    image: string
    variants: VariantsWithImagesTags
}

const ActionCell = (row: Row<Product>) => {
    const product = row.original;
    const router = useRouter();

    const { execute } = useAction(deleteProduct, {
        onSuccess: ({ data }) => {
            if (data?.error) {
                toast.error(data?.error)
            }
            if (data?.success) {
                toast.success(data?.success);
                router.push("/dashboard/products");
            }
        }
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-primary focus:bg-primary/20 focus:text-primary font-medium duration-300">
                    <Link href={`/dashboard/create-product?edit_id=${product.id}`}>Edit Product</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execute({ id: product.id })} className="cursor-pointer text-red-600 focus:bg-red-200 focus:text-red-600 font-medium duration-300">
                    Delete product
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image") as string
            const title = row.getValue("title") as string
            return <Image src={image} alt={title} width={50} height={50} />
        }
    },
    {
        accessorKey: "variants",
        header: "Variants",
        cell: ({ row }) => {
            const variants = row.getValue("variants") as VariantsWithImagesTags[];
            return (<div className="flex gap-1">
                {variants.map(v => (
                    <VariantDialog key={v.id} editMode={true} variant={v} productID={row.original.id}>
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: v.color }} />
                    </VariantDialog>

                ))}
                <VariantDialog editMode={false} productID={row.original.id}>
                    <CirclePlus className="w-5 h-5 text-gray-500 hover:text-black duration-200 cursor-pointer" />
                </VariantDialog>
            </div>
            )
        }
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const title = row.getValue("title") as string
            return <span className="text-sm font-medium">{title}</span>
        }
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <span className="text-sm font-medium">{formatted}</span>
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return ActionCell(row)
        },
    },
]
