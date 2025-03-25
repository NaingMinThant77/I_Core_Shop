"use client"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { VariantsWithImagesTags } from "@/lib/infer-type"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type ImageSliderProps = {
    variants: VariantsWithImagesTags[]
}
const ImageSlider = ({ variants }: ImageSliderProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState<number[]>([0]);
    const searchParams = useSearchParams();
    const currentVariantType = searchParams.get("type");

    useEffect(() => {
        if (!api) { return };
        api.on("slidesInView", (e) => {
            setActiveIndex(e.slidesInView())
        })
    }, [api])

    return (
        <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
                {variants.map((v) => (v.productType === currentVariantType && v.variantImage.map(
                    img => (<CarouselItem key={img.image_url}>
                        {
                            img.image_url ? <Image src={img.image_url} alt={img.name} width={1100} height={600} priority /> : null
                        }
                    </CarouselItem>)
                )))}
            </CarouselContent>
            <div className="flex gap-4 py-2">
                {variants.map((v) => (v.productType === currentVariantType && v.variantImage.map(
                    (img, index) => (<div key={img.image_url}>
                        {
                            img.image_url ? <Image src={img.image_url} alt={img.name} width={72} height={42} priority
                                onClick={() => api?.scrollTo(index)}
                                className={cn("rounded-md border-2 border-slate-200 cursor-pointer transition-all", index === activeIndex[0] ? "opacity-100 border-slate-400" : "opacity-50")} /> : null
                        }
                    </div>)
                )))}
            </div>
        </Carousel>

    )
}

export default ImageSlider

