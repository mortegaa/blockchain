"use client"
import React from 'react'
import Letter from './Letter'

export const Board = () => {
    return (
        <div className='w-[450px] h-[550px] border-black flex flex-col'>
            <div className="flex m-1 flex-row flex-[33%] h-[50px]">
                <Letter letterPosition={0} attempValue={0} />
                <Letter letterPosition={1} attempValue={0} />
                <Letter letterPosition={2} attempValue={0} />
                <Letter letterPosition={3} attempValue={0} />
                <Letter letterPosition={4} attempValue={0} />
            </div>
            <div className="flex m-1 flex-row flex-[33%]">
                <Letter letterPosition={0} attempValue={1} />
                <Letter letterPosition={1} attempValue={1} />
                <Letter letterPosition={2} attempValue={1} />
                <Letter letterPosition={3} attempValue={1} />
                <Letter letterPosition={4} attempValue={1} />
            </div>
            <div className="flex m-1 flex-row flex-[33%]">
                <Letter letterPosition={0} attempValue={2} />
                <Letter letterPosition={1} attempValue={2} />
                <Letter letterPosition={2} attempValue={2} />
                <Letter letterPosition={3} attempValue={2} />
                <Letter letterPosition={4} attempValue={2} />
            </div>
            <div className="flex m-1 flex-row flex-[33%]">
                <Letter letterPosition={0} attempValue={3} />
                <Letter letterPosition={1} attempValue={3} />
                <Letter letterPosition={2} attempValue={3} />
                <Letter letterPosition={3} attempValue={3} />
                <Letter letterPosition={4} attempValue={3} />
            </div>
            <div className="flex m-1 flex-row flex-[33%]">
                <Letter letterPosition={0} attempValue={4} />
                <Letter letterPosition={1} attempValue={4} />
                <Letter letterPosition={2} attempValue={4} />
                <Letter letterPosition={3} attempValue={4} />
                <Letter letterPosition={4} attempValue={4} />
            </div>
            <div className="flex m-1 flex-row flex-[33%]">
                <Letter letterPosition={0} attempValue={5} />
                <Letter letterPosition={1} attempValue={5} />
                <Letter letterPosition={2} attempValue={5} />
                <Letter letterPosition={3} attempValue={5} />
                <Letter letterPosition={4} attempValue={5} />
            </div>
        </div>
    )
}
