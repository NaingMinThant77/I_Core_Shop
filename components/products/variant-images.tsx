import { VariantSchema } from '@/types/variant-schema'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import * as z from 'zod'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '../ui/form'
import { UploadDropzone } from '@/app/api/uploadthing/uploadthing'
import Image from 'next/image'
import { Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

const VariantImages = () => {
    const { control, getValues, setError } = useFormContext<z.infer<typeof VariantSchema>>()
    const { fields, append, remove, update } = useFieldArray({
        control, name: "variantImages",
    })

    return (
        <div>
            <FormField control={control} name="variantImages" render={({ field }) => (
                <FormItem>
                    <FormLabel>Upload Images</FormLabel>
                    <FormDescription>You can upload multiple images up to 10 images at once</FormDescription>
                    <FormControl>
                        <UploadDropzone endpoint="variantImagesUploader"
                            className='ut-allowed-content:text-primary ut-label:text-primary 
                        ut-upload-icon:text-primary/70 ut-button:bg-primary cursor-pointer'
                            onBeforeUploadBegin={(files) => {
                                files.forEach((file) => {
                                    append({
                                        name: file.name,
                                        size: file.size,
                                        url: URL.createObjectURL(file) //preview blob, create temporary url
                                    })
                                })
                                return files
                            }}
                            onUploadError={(error) => {
                                setError("variantImages", {
                                    type: "validate",
                                    message: error.message,
                                })
                            }}
                            onClientUploadComplete={(data) => {// data from after upload
                                const variantImages = getValues("variantImages") // preview temporary urls
                                variantImages.forEach((img, index) => {
                                    if (img.url.startsWith("blob:")) { // blob = upload or preview
                                        const image = data.find((i) => i.name === img.name)
                                        if (image) {
                                            update(index, {
                                                url: image.url,
                                                name: image.name,
                                                size: image.size,
                                                key: image.key
                                            })
                                        }
                                    }
                                })
                            }}
                            // if you want to upload images directly after choosing
                            config={{ mode: "auto" }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className='flex gap-2 my-2 flex-wrap'>
                {fields.map((field, index) => (
                    <div key={index} className={cn('border-2 border-gray-300 rounded-md relative h-[83px] w-[83px] overflow-hidden', field.url.startsWith("blob:") && "animate-pulse")}>
                        <Image src={field.url} alt={field.name} width={70} height={50} className='object-cover w-full h-full' />
                        <Trash className='w-5 h-5 cursor-pointer text-red-600 p-1 absolute top-1 right-1'
                            onClick={(e) => {
                                e.preventDefault()
                                remove(index)
                            }} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VariantImages

