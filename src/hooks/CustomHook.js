import { useEffect, useState } from "react"

export const useTextareaResize = (textAreaRef) => {
    const [text, setText] = useState("")
	const [textAreaHeight, setTextAreaHeight] = useState("auto")
	const [parentHeight, setParentHeight] = useState("auto")

    const onChangeHandler = (event) => {
		setTextAreaHeight("auto")
		setParentHeight(`${textAreaRef.current.scrollHeight}px`)
		setText(event.target.value)	
	}

    useEffect(() => {
        if (textAreaRef.current !== null) {
            setParentHeight(`${textAreaRef.current.scrollHeight}px`)
		    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`)
        }
	}, [text, textAreaRef])

    return {
        text,
        textAreaHeight,
        parentHeight,
        onChangeHandler
    }
}
