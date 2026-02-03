"use client";
import { Trash2 } from 'lucide-react';
import { HiPencil } from "react-icons/hi2";

const EditDeleteIcon = () => {
  return (
    <div className='flex gap-4 items-center text-text-secondary'>
        <button className='cursor-pointer hover:text-red-700 transition'>
            <HiPencil size={16}/>
        </button>

    <button className='cursor-pointer hover:text-red-700 transition'>
            <Trash2 size={16}/>
        </button>

    </div>
  )
}

export default EditDeleteIcon
