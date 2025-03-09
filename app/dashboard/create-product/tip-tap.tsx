"use client"
import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from '@/components/ui/toggle'
import { Bold, Heading1, Heading2, Italic, List, ListOrdered, Strikethrough } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

type TiptapProps = {
    val: string
}

const TipTap = ({ val }: TiptapProps) => {
    const { setValue } = useFormContext()

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                orderedList: {
                    HTMLAttributes: { class: "list-decimal pl-4" }
                },
                bulletList: {
                    HTMLAttributes: { class: "list-disc pl-4" }
                },
                heading: {
                    HTMLAttributes: { class: "text-xl font-bold" },
                    levels: [1]
                },
            })
        ],
        content: val,
        editorProps: {
            attributes: {
                class: "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            }
        },
        onUpdate: ({ editor }) => {
            const content = editor.getHTML()
            setValue("description", content, {
                shouldValidate: true,
                shouldDirty: true
            })
        }
    })

    useEffect(() => {
        if (editor?.isEmpty) editor.commands.setContent(val)
    }, [val])

    return <div className='space-y-2'>
        {editor && <div>
            <Toggle size={"sm"} pressed={editor.isActive("heading", { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                <Heading1 className='h-4 w-4' />
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
                <Bold className='h-4 w-4' />
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
                <Italic className='h-4 w-4' />
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("strike")} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
                <Strikethrough className='h-4 w-4' />
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("orderedList")} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
                <ListOrdered className='h-4 w-4' />
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("bulletList")} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
                <List className='h-4 w-4' />
            </Toggle>
            <EditorContent editor={editor} />
        </div>}
    </div>
}

export default TipTap
