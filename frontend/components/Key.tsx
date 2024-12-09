"use client"
import React, { useContext } from 'react'
import { AppContext } from '@/app/game/page';

interface KeyProps {
    keyVal: any;
    bigKey?: boolean
    disabled?: boolean
}
export const Key = ({ keyVal, bigKey, disabled }: KeyProps) => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('Letter must be used within an AppContext.Provider');
    }
    const {  onDelete, onEnter, onSelectLetter } = context;
    const selectedLetter = () => {
        if (keyVal == "ENTER")
        {
           onEnter();
        }
        else if (keyVal == "DELETE")
        {
            onDelete();
        }
        else
            onSelectLetter(keyVal);
    }
    return (
        <div
            onClick={selectedLetter}
            className={`h-[60px] m-1 border rounded grid place-items-center text-xl bg-gray-500 cursor-pointer ${bigKey ? "w-[100px]" : "w-[50px]"} ${disabled ? "bg-[#3a393c]" : ""}`}
        >
            {keyVal}
        </div>
    )
}
