import { useState, useEffect } from 'react'

export default function SearchBar({searchInput, setSearchInput}:{searchInput: string, setSearchInput: (text: string) => void}) {
    const [textChanged, setTextChanged] = useState(searchInput)
    useEffect(() => {
        const checkBounceback = setTimeout(() => {
            console.log(textChanged)
            setSearchInput(textChanged);
        }, 500);

        return () => {
            clearTimeout(checkBounceback)
        }
    }, [textChanged, setSearchInput])
    return (
        <textarea 
            id="message" 
            style={{resize: "none"}}
            rows={1} 
            className="max-w-xs mx-auto block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by Organization ID..."
            onChange={e => {
                setTextChanged(e.target.value)}}
        />
    )
} 